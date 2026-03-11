const { getRocptx } = require('./runtime');

function pickArray(data, arrayKey) {
    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data[arrayKey])) return data[arrayKey];
    return [];
}

function pickFirst(data, arrayKey) {
    const list = pickArray(data, arrayKey);
    return list[0] || null;
}

class BaseCrawler {
    async getApi() {
        throw new Error('getApi() must be implemented by subclasses.');
    }
}

class BaseMetroCrawler extends BaseCrawler {
    constructor(namespaceKey) {
        super();
        this.namespaceKey = namespaceKey;
    }

    async getApi() {
        const rocptx = await getRocptx();
        return rocptx[this.namespaceKey];
    }

    async listLines() {
        const api = await this.getApi();
        const result = await api._Line();
        return pickArray(result.data, 'Lines');
    }

    async getStationsByLine(lineId) {
        const api = await this.getApi();
        const result = await api.getStationOfLine(lineId);
        return result.data[0] && Array.isArray(result.data[0].Stations)
            ? result.data[0].Stations
            : [];
    }
}

class TrtcCrawler extends BaseMetroCrawler {
    constructor() { super('trtc'); }
}

class KrtcCrawler extends BaseMetroCrawler {
    constructor() { super('krtc'); }
}

class TymetroCrawler extends BaseMetroCrawler {
    constructor() { super('tymetro'); }
}

class TmrtCrawler extends BaseMetroCrawler {
    constructor() { super('tmrt'); }
}

class KlrtCrawler extends BaseMetroCrawler {
    constructor() { super('klrt'); }
}

class ThsrV2Crawler extends BaseCrawler {
    async getApi() {
        const rocptx = await getRocptx();
        return rocptx.thsr.v2;
    }

    async listStations() {
        const api = await this.getApi();
        const result = await api.getStationOfLine('');
        const stationOfLines = Array.isArray(result.data)
            ? result.data
            : pickArray(result.data, 'StationOfLines');

        return stationOfLines.flatMap((line) => Array.isArray(line.Stations) ? line.Stations : []);
    }

    async getStation(stationId) {
        const api = await this.getApi();
        const result = await api.getStation(stationId);
        return pickFirst(result.data, 'Stations') || result.data || null;
    }
}

class TraCrawler extends BaseCrawler {
    async getApi() {
        const rocptx = await getRocptx();
        return rocptx.tra;
    }

    async listLines() {
        const api = await this.getApi();
        const result = await api._Line();
        return pickArray(result.data, 'Lines');
    }

    async getStationsByLine(lineId) {
        const api = await this.getApi();
        const result = await api.getStationOfLine(lineId);
        return result.data[0] && Array.isArray(result.data[0].Stations)
            ? result.data[0].Stations
            : [];
    }
}

class TraV3Crawler extends BaseCrawler {
    async getApi() {
        const rocptx = await getRocptx();
        return rocptx.tra.v3;
    }

    async listLines() {
        const api = await this.getApi();
        const result = await api._Line();
        return pickArray(result.data, 'Lines');
    }

    async getStationsByLine(lineId) {
        const api = await this.getApi();
        const result = await api.getStationOfLine(lineId);
        const stationOfLine = pickFirst(result.data, 'StationOfLines');
        return stationOfLine && Array.isArray(stationOfLine.Stations)
            ? stationOfLine.Stations
            : [];
    }
}

function createAllCrawlers() {
    return {
        trtc: new TrtcCrawler(),
        krtc: new KrtcCrawler(),
        tymetro: new TymetroCrawler(),
        tmrt: new TmrtCrawler(),
        klrt: new KlrtCrawler(),
        thsrv2: new ThsrV2Crawler(),
        tra: new TraCrawler(),
        trav3: new TraV3Crawler()
    };
}

function createCrawler(name) {
    const aliases = {
        thsr: 'thsrv2',
        'tra.v3': 'trav3'
    };
    const crawlers = createAllCrawlers();
    const key = aliases[name] || String(name || '').toLowerCase();
    const crawler = crawlers[key];

    if (!crawler) {
        throw new Error(`Unknown crawler \"${name}\". Available: ${Object.keys(crawlers).join(', ')}`);
    }

    return crawler;
}

async function main() {
    const [crawlerName, action, ...args] = process.argv.slice(2);

    if (!crawlerName || !action) {
        console.error('Usage: node nodejs/auto-crawler.js <crawler> <action> [args...]');
        console.error('Example: node nodejs/auto-crawler.js trtc listLines');
        process.exitCode = 1;
        return;
    }

    const crawler = createCrawler(crawlerName);
    if (typeof crawler[action] !== 'function') {
        throw new Error(`Crawler \"${crawlerName}\" does not support action \"${action}\".`);
    }

    const result = await crawler[action](...args);
    console.log(JSON.stringify(result, null, 2));
}

if (require.main === module) {
    main().catch((error) => {
        console.error(error && error.stack ? error.stack : error);
        process.exitCode = 1;
    });
}

module.exports = {
    BaseMetroCrawler,
    TrtcCrawler,
    KrtcCrawler,
    TymetroCrawler,
    TmrtCrawler,
    KlrtCrawler,
    ThsrV2Crawler,
    TraCrawler,
    TraV3Crawler,
    createCrawler,
    createAllCrawlers
};