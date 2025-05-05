const fs = require('fs');
const TLDParser = require('../Util/TLDParser');

class AnalyticsService
{
    storeName = "analytics.json";

    getStore()
    {
        return JSON.parse(fs.readFileSync('./data/' + this.storeName));
    }

    save(modifiedStore)
    {
        const modifiedStoreAsString = JSON.stringify(modifiedStore, null, 4);

        try {
            fs.writeFileSync('./data/' + this.storeName, modifiedStoreAsString);
        } catch (error) {
            console.log("Error, couldn't write to file.");
        }
    }

    addPageVisit(body, headers)
    {
        const store = this.getStore();
        const data = {
            ...body,
            referer: TLDParser.getDomain(headers['referer']),
            date: new Date().toISOString(),
        }

        store['visits'].push(data);
        this.save(store)
    }
}

module.exports = AnalyticsService;