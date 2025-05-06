const bcrypt = require('bcrypt');

class FingerprintService
{
    constructor(headers) {
        this.userAgent = headers['user-agent'];
        this.deviceMemory = headers['x-device-mem'];
        this.screenResolution = headers['x-screen-resolution'];
        this.language = headers['accept-language'];
        this.timestamp = Date.now();
    }

    async createIdentifier()
    {
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(JSON.stringify({
            userAgent: this.userAgent,
            timestamp: this.timestamp,
            deviceMemory: this.deviceMemory,
            language: this.language,
            timestamp: this.timestamp
        }), salt);

        return hash;
    }
}

module.exports = FingerprintService;