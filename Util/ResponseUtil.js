const {dirname} = require('path');

class ResponseUtil
{
    static sendFile(res, filePath)
    {
        res.status(200);
        res.sendFile(`${dirname(require.main.filename)}/public/${filePath}`);
    }
}

module.exports = ResponseUtil;