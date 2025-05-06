class TLDParser
{
    static getDomain(url)
    {
        let domain = '';
        
        try {
            console.log(url, new URL(url));
            domain = new URL(url).hostname;
            console.log(domain);
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