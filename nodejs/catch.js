const fs = require('fs');
const path = require('path');
const { getRocptx } = require('./runtime');

function parseArgs() {
    const args = { vars: {} };
    for (let i = 2; i < process.argv.length; i++) {
        let arg = process.argv[i];
        if ((arg.startsWith("'") && arg.endsWith("'")) || (arg.startsWith('"') && arg.endsWith('"'))) {
            arg = arg.substring(1, arg.length - 1);
        }
        if (arg.startsWith('--')) {
            const key = arg.substring(2);
            if (key === 'urls') {
                if (i + 1 < process.argv.length) {
                    let nextArg = process.argv[i + 1];
                    if ((nextArg.startsWith("'") && nextArg.endsWith("'")) || (nextArg.startsWith('"') && nextArg.endsWith('"'))) {
                        nextArg = nextArg.substring(1, nextArg.length - 1);
                    }
                    if (!nextArg.startsWith('--')) {
                        args.urls = nextArg;
                        i++;
                        // 嚴格檢查並收集緊接在後的 $Key=Value
                        while (i + 1 < process.argv.length) {
                            let varArg = process.argv[i + 1];
                            if ((varArg.startsWith("'") && varArg.endsWith("'")) || (varArg.startsWith('"') && varArg.endsWith('"'))) {
                                varArg = varArg.substring(1, varArg.length - 1);
                            }
                            if (varArg.startsWith('$')) {
                                const eqIndex = varArg.indexOf('=');
                                if (eqIndex > -1) {
                                    const varName = varArg.substring(1, eqIndex);
                                    const varValue = varArg.substring(eqIndex + 1);
                                    args.vars[varName] = varValue;
                                }
                                i++;
                            } else {
                                break;
                            }
                        }
                    }
                }
            } else {
                if (i + 1 < process.argv.length) {
                    let nextArg = process.argv[i + 1];
                    if ((nextArg.startsWith("'") && nextArg.endsWith("'")) || (nextArg.startsWith('"') && nextArg.endsWith('"'))) {
                        nextArg = nextArg.substring(1, nextArg.length - 1);
                    }
                    if (!nextArg.startsWith('--') && !nextArg.startsWith('$')) {
                        args[key] = nextArg;
                        i++;
                    } else {
                        args[key] = true;
                    }
                } else {
                    args[key] = true;
                }
            }
        }
    }
    return args;
}

function printHelp() {
    console.log(`
用法: node catch.js [選項]

選項:
  --help                 顯示這個說明
  --download             加上此參數時，會將結果存檔。不加時，自動印出 JSON 內容
  --AppID <id>           設定 PTX AppID (若不指定則使用預設值)
  --AppKey <key>         設定 PTX AppKey (若不指定則使用預設值)
  --company <name>       指定運具公司: trtc, krtc, tymc, ntmc, tmrt, klrt, thsrv2, tra, trav3
  --catch <type>         指定下載資料類型 (整包)
  --urls <API>           呼叫指定的網址 API (需替換變數)，後方可緊接 $Key=Value 變數
  --ver <num>            配合 --urls 使用，指定 API 版本 (例如 --ver 3 會呼叫 v3urls)
  --filename <name>      設定輸出的 JSON 檔案名稱。預設為 {company}.{action}.json

主要動作 (必須且只能選擇其一):
  --help | --catch | --urls

支援的公司與 --catch 下載類型組合:
  捷運類 (trtc, krtc, tymc, ntmc, tmrt, klrt):
    - line          : 路線包
    - station       : 車站包
    - fare          : 票價包
    - timetable     : 時刻表包
    - timesimple    : 時刻簡易包
    - transfer      : 轉乘包
  
  高鐵 (thsrv2):
    - station       : 車站包
    - timetable     : 時刻表包
    - timesimple    : 時刻簡易包

  台鐵 (tra / trav3):
    - line          : 路線包
    - linesimple    : 路線簡易包
    - station       : 車站包
    - traintype     : 車種包
    - timetable     : 時刻表包
    - timesimple    : 時刻簡易包

範例:
  1. 下載台鐵路線包 (存檔):
     node catch.js --download --catch line --company tra --filename tra.line.json
  2. 呼叫起訖站票價 API (不存檔，直接印出):
     node catch.js --urls ODFareFromTo $OriginStationID=0920 $DestinationStationID=0950 --company tra --ver 3 
`);
}

async function performDownload(company, catchType, rocptx) {
    let apiBase;
    let fnName;

    if (['trtc', 'krtc', 'tymc', 'ntmc', 'tmrt', 'klrt'].includes(company)) {
        apiBase = rocptx[company];
        const map = { line: 'Line', station: 'Station', fare: 'Fare', timetable: 'TimeTable', timesimple: 'TimeSimple', transfer: 'Transfer' };
        fnName = map[catchType];
    } else if (company === 'thsrv2') {
        apiBase = rocptx.thsr.v2;
        const map = { station: 'Station', timetable: 'GeneralTimetable', timesimple: 'SimpleTimetable' };
        fnName = map[catchType];
    } else if (company === 'tra') {
        apiBase = rocptx.tra;
        const map = { line: 'Line', linesimple: 'SimpleLine', station: 'Station', traintype: 'TrainType', timetable: 'GeneralTimetable', timesimple: 'SimpleTimetable' };
        fnName = map[catchType];
    } else if (company === 'trav3') {
        apiBase = rocptx.tra.v3;
        const map = { line: 'Line', linesimple: 'SimpleLine', station: 'Station', traintype: 'TrainType', timetable: 'GeneralTrainTimetable', timesimple: 'SimpleTimetable' };
        fnName = map[catchType];
    } else {
        throw new Error(`不支援的公司: ${company}`);
    }

    if (!apiBase || !apiBase.catchData || typeof apiBase.catchData[fnName] !== 'function') {
        throw new Error(`不支援的組合: company=${company}, catch=${catchType}`);
    }

    const progressLogger = (msg) => console.error(`[進度] ${msg}`);
    console.error(`[提示] 開始取得: ${company} - ${catchType}`);
    const result = await apiBase.catchData[fnName](progressLogger);
    return result;
}

async function performUrls(args, rocptx) {
    const company = args.company.toLowerCase();
    const isV3 = args.ver && args.ver === '3';
    
    // 取得 apiBase 與 urls 設定檔
    const apiBase = isV3 ? rocptx[company].v3 : rocptx[company];
    const urlsDef = isV3 ? apiBase.urls : rocptx[company].urls;
    
    if(!apiBase || !urlsDef) throw new Error(`找不到指定的 company 或 version 設定: company=${company}, ver=${args.ver}`);

    const targetUrl = urlsDef[args.urls];
    if (!targetUrl) throw new Error(`找不到指定的 URL 名稱: ${args.urls}`);
    
    // 檢查從 CLI 傳入的所有變數，是否都能在 Restful URL 結構裡找到對應的 {Key}
    const paramsInUrl = (targetUrl.match(/\{([^}]+)\}/g) || []).map(p => p.substring(1, p.length - 1));
    for (let givenKey of Object.keys(args.vars)) {
        if (!paramsInUrl.includes(givenKey)) {
             throw new Error(`傳入的變數 $${givenKey} 沒有對應到 URL (${args.urls}) 內的變數參數！`);
        }
    }
    
    if (typeof apiBase['_' + args.urls] === 'function') {
        console.error(`[提示] 呼叫 API: ${args.urls}`);
        // 直接將包含 keys 的 object 傳給 API
        return await apiBase['_' + args.urls](args.vars);
    } else {
        throw new Error(`不支援的 API 呼叫: ${args.urls} (可能尚未實作 '_' 開頭之自動生成函數)`);
    }
}

async function main() {
    const args = parseArgs();

    // 決定要執行的主要 action
    const mainActions = ['catch', 'urls', 'help'];
    const activeActions = mainActions.filter(a => args[a] !== undefined);

    if (activeActions.length !== 1) {
        console.error("錯誤: 必須且只能指定一種主要動作 (--catch | --urls | --help)");
        process.exit(1);
    }

    const action = activeActions[0];

    if (action === 'help') {
        printHelp();
        process.exit(0);
    }

    if (args.AppID) process.env.ROCPTX_APP_ID = args.AppID;
    if (args.AppKey) process.env.ROCPTX_APP_KEY = args.AppKey;

    let result = null;
    try {
        const rocptx = await getRocptx();
        if (action === 'catch') {
            if (!args.company || args.company === true) throw new Error("必須指定 --company 數值");
            result = await performDownload(args.company.toLowerCase(), args.catch.toLowerCase(), rocptx);
        } else if (action === 'urls') {
            if (!args.company || args.company === true) throw new Error("必須指定 --company 數值");
            result = await performUrls(args, rocptx);
        }
    } catch (err) {
        console.error(`執行錯誤: ${err.stack || err.message || err}`);
        process.exit(1);
    }

    // 判斷是否需要存檔或印出
    if (args.download) {
        const targetDir = path.join(process.cwd(), 'download');
        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
        }
        
        let targetFilename = args.filename;
        if (!targetFilename) {
            if (action === 'urls') {
                targetFilename = `${args.company}.${args.urls}.json`;
            } else if (action === 'catch') {
                targetFilename = `${args.company}.${args.catch}.json`;
            }
        }

        const filePath = path.join(targetDir, targetFilename);
        fs.writeFileSync(filePath, JSON.stringify(result, null, 2), 'utf8');
        console.log(`[完成] 結果已存為 ${filePath}`);
    } else {
        // 沒有 --download，則將結果 JSON 直接印在螢幕上
        console.log(JSON.stringify(result, null, 2));
    }
}

main();
