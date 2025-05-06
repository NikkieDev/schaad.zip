const fs = require('fs');
const TLDParser = require('../Util/TLDParser');

class AnalyticsService
{
    storeName = "analytics.json";

    constructor()
    {
        this.verifyStoreExists();
    }

    verifyStoreExists()
    {
        try {
            fs.readFileSync(`./data/${this.storeName}`);
        } catch (error) {
            fs.writeFileSync(`./data/${this.storeName}`, JSON.stringify(this.getDefaultObj(), null, 4));
        }
    }

    getDefaultObj()
    {
        return {
            'visits': [],
        }
    }

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
        const originDomain = TLDParser.getDomain(body['visitOrigin']) || 'schaad.zip';

        const data = {
            ...body,
            visitOrigin: originDomain,
            date: new Date().toISOString(),
            userAgent: headers['user-agent']
        }

        store['visits'].push(data);
        this.save(store)
    }
}

module.exports = AnalyticsService;