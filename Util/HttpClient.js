const ApiUnauthorizedError = require("../Exception/ApiUnauthorizedError");

module.exports = class HttpClient
{
    #hostname = process.env.API_URL;
    #token = "";

    constructor()
    {
        if (!this.#token) {
            this.#token = this.#login();
        }
    }

    async #login()
    {
        const formData = new FormData();
        formData.append('username', process.env.API_USER);
        formData.append('password', process.env.API_PASSWORD);

        const response = await fetch(`https://${process.env.API_URL}/login`, {
            method: 'POST',
            body: formData
        });

        if (200 !== response.status) {
            throw new ApiUnauthorizedError("Unable to authenticate API request");
        }

        const responseBody = await response.json();
        this.#token = responseBody.data.token;
    }
    
    async doRequest(path, options)
    {
        try {
            const response = await fetch(`${this.#hostname}/${path}`, options);

            if (401 === response.status) {
                throw new ApiUnauthorizedError("An error has occured");
            }

            if (200 !== response.status) {
                throw new Error((await response.json())['message']);
            }

            return await response.json();
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}