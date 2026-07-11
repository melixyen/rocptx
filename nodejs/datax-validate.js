/**
 * datax 契約驗證器：依 datax-schema.js 的規則檢查資料。
 * update-datax.js 寫檔前使用；datax-contract.test.js 也用它驗證 repo 內現有檔案。
 */

// 檢查單一路徑，回傳 true/false。path 語法見 datax-schema.js 說明。
function checkPath(value, segments) {
    if (segments.length === 0) return value !== undefined;
    const [seg, ...rest] = segments;
    const isArraySeg = seg.endsWith('[]');
    const key = isArraySeg ? seg.slice(0, -2) : seg;
    const next = value == null ? undefined : value[key];
    if (isArraySeg) {
        if (!Array.isArray(next) || next.length === 0) return false;
        if (rest.length === 0) return true;
        return next.every((el) => checkPath(el, rest));
    }
    if (rest.length === 0) return next !== undefined;
    return checkPath(next, rest);
}

function splitPath(path) {
    return path.split('.');
}

function validate(data, schema, label = '') {
    const errors = [];
    const tag = label ? label + ' ' : '';

    if (schema.type === 'array') {
        if (!Array.isArray(data)) {
            return [`${tag}應為陣列`];
        }
        if (schema.minItems && data.length < schema.minItems) {
            errors.push(`${tag}筆數 ${data.length} 低於下限 ${schema.minItems}`);
        }
        for (const path of schema.every || []) {
            const segs = splitPath(path);
            const badIdx = data.findIndex((item) => !checkPath(item, segs));
            if (badIdx !== -1) {
                errors.push(`${tag}[${badIdx}] 缺少必要欄位 ${path}`);
            }
        }
        if (schema.anyOfEvery && schema.anyOfEvery.length) {
            const alts = schema.anyOfEvery.map((paths) => paths.map(splitPath));
            const badIdx = data.findIndex((item) => !alts.some((paths) => paths.every((segs) => checkPath(item, segs))));
            if (badIdx !== -1) {
                errors.push(`${tag}[${badIdx}] 未符合任一組替代欄位 ${JSON.stringify(schema.anyOfEvery)}`);
            }
        }
        for (const path of schema.some || []) {
            const segs = splitPath(path);
            if (!data.some((item) => checkPath(item, segs))) {
                errors.push(`${tag}沒有任何項目具備欄位 ${path}`);
            }
        }
    } else if (schema.type === 'object') {
        if (!data || typeof data !== 'object' || Array.isArray(data)) {
            return [`${tag}應為物件`];
        }
        const keyCount = Object.keys(data).length;
        if (schema.minKeys && keyCount < schema.minKeys) {
            errors.push(`${tag}key 數 ${keyCount} 低於下限 ${schema.minKeys}`);
        }
    }

    if (typeof schema.custom === 'function') {
        try {
            errors.push(...(schema.custom(data) || []).map((e) => tag + e));
        } catch (e) {
            errors.push(`${tag}custom 驗證拋錯: ${e.message || e}`);
        }
    }
    return errors;
}

// 縮水保護：新資料量不得比舊資料縮水超過 40%
function checkShrink(newData, oldData, label = '') {
    const count = (d) => (Array.isArray(d) ? d.length : Object.keys(d || {}).length);
    const n = count(newData), o = count(oldData);
    if (o > 0 && n < o * 0.6) {
        return [`${label} 資料量由 ${o} 縮水為 ${n}（低於 60% 門檻），拒絕寫入`];
    }
    return [];
}

module.exports = { validate, checkShrink, checkPath };
