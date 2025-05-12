const ApiUnauthorizedError = require('../Exception/ApiUnauthorizedError');
const HttpClient = require('../Util/HttpClient');

class ShortenService
{
    #client = null;

    constructor() {
        this.#client = new HttpClient();
    }

    async linkExists(link)
    {
        const formData = new FormData();
        formData.append('link', link);

        const options = {
            body: formData,
            method: 'POST',
        }

        const response = await this.#client.doRequest('/knipurl/exists', options);
    }

    shorten(link){};
}

module.exports = ShortenService