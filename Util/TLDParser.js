class TLDParser
{
    static getDomain(url)
    {
        let domain = '';
        
        try {
            domain = new URL(url).hostname;
            return domain;
        } catch (error) {
            return domain;
        }
    }

    static getProtocol(url)
    {
        return url.split('://')[0];
    }
}

module.exports = TLDParser;