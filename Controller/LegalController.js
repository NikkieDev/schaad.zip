const BaseController = require('./BaseController');
const ResponseUtil = require('../Util/ResponseUtil');

class LegalController extends BaseController
{
    constructor()
    {
        super();
        this.register();
    }

    register()
    {
        this.getRouter().get('/privacy', (req, res) => ResponseUtil.sendFile(res, 'Legal/privacy-policy.pdf'));
    }
}

module.exports = new LegalController();