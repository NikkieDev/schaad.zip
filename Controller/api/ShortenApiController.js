const BaseController = require("../BaseController");
const ShortenService = require('../../Service/ShortenService');
const ResponseUtil = require("../../Util/ResponseUtil");

class ShortenApiController extends BaseController
{
    #shortenService;

    constructor()
    {
        this.#shortenService = new ShortenService();
        super();
        this.register();
    }

    register()
    {
        this.getRouter().post('/api/shorten', (req, res) => {
            const link = req.body.link;

            if (!link) {
                ResponseUtil.sendJsonResponse(res, {
                    message: 'Bad Request, no link supplied.',
                }, 400);

                return;
            }

            try {
                const exists = this.#shortenService.linkExists(link);
                
                if (!exists) {
                    const shortUrl = this.#shortenService.shorten(link);

                    ResponseUtil.sendJsonResponse(res, {
                        message: 'ok',
                        data: {
                            original: link,
                            short: shortUrl
                        }
                    }, 200);

                    return;
                }

                ResponseUtil.sendJsonResponse(res, {
                    message: 'Link already exists.',
                    data: {
                        original: link,
                        short: this.#shortenService.getExistingLinkByURL(link),
                    },
                }, 302);

                return;
            } catch (error) {
                if (error.name === 'ApiUnauthorizedError') {
                    ResponseUtil.sendJsonResponse(res, {
                        message: 'Unable to shorten link, unauthorized.',
                    }, 401);

                    return;
                }
            }
        });
    }
}

module.exports = ShortenApiController;