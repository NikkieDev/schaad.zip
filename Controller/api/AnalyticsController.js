const BaseController = require('../BaseController');
const FingerprintService = require('../../Service/FingerprintService');
const ResponseUtil = require('../../Util/ResponseUtil');

class AnalyticsController extends BaseController
{
    constructor()
    {
        super();
        this.register();
    }

    register()
    {
        this.getRouter().post('/api/analytics', (req, res) => {
            this.getAnalytics().addPageVisit(req.body, req.headers);
        });

        this.getRouter().get('/api/cookie', async (req, res) => {
            const fingerprintService = new FingerprintService(req.headers);
            const identifier = await fingerprintService.createIdentifier();

            ResponseUtil.sendJsonResponse(res, {
                data: {
                    identifier: identifier,
                },
            }, 200);

            return;
        })
    }
}

module.exports = new AnalyticsController();