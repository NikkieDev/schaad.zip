const {dirname} = require('path');

class ResponseUtil
{
    static sendFile(res, filePath)
    {
        res.status(200);
        res.sendFile(`${dirname(require.main.filename)}/public/${filePath}`);
    }

    static sendJsonResponse(res, json, status)
    {
        res.status(status);
        res.setHeader('content-type', 'application/json');
        res.json(json);
    }
}

module.exports = ResponseUtil;