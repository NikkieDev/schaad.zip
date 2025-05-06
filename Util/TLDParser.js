class TLDParser
{
    static getDomain(url)
    {
        return new URL(url).hostname;
    }

    static getProtocol(url)
    {
        return url.split('://')[0];
    }
}

module.exports = TLDParser;