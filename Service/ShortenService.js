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
    // async linkExists(link)
    // {
    //     const formData = new FormData();
    //     formData.append('link', link);

    //     try {
    //         const response = await fetch('https://api.schaad.zip', {
    //             method: 'POST',
    //             body: formData,
    //         });

    //         if (200 !== response.status) {
    //             throw new ApiUnauthorizedError("Unable to authenticate API Request");
    //         }
    //     } catch (error) {
    //         if (error.name === 'ApiUnauthorizedError') {
    //             this.#login();
    //             return this.linkExists(link);
    //         }
    //     }
    // }

    shorten(link){};
}

module.exports = ShortenService