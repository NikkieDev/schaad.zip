const BaseController = require('../BaseController');

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
    }
}

module.exports = new AnalyticsController();