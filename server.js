const express = require('express');
require('dotenv').config();

const analyticsController = require('./Controller/api/AnalyticsController');
const legalController = require('./Controller/LegalController');
const EnvironmentValidator = require('./Util/EnvironmentValidator');
const DbService = require('./Service/DbService');

class Server
{
    constructor() {
        EnvironmentValidator.verifyAllRequired();

        this.port = parseInt(process.env.PORT || 3001);
        this.app = express();

        this.initializeMiddleware();
        this.initializeRoutes();
    }

    initializeMiddleware() {
        this.app.use(express.static('public'));
        this.app.use(express.json());
        this.app.use((req, res, next) => {
            res.removeHeader('X-powered-by');
            next();
        });
    }

    initializeRoutes() {
        this.app.get('/', (req, res) => res.sendFile(__dirname + '/public/pages/home.html'));
        this.app.use(analyticsController.getRouter());
        this.app.use(legalController.getRouter());
    }

    listen() {
        this.app.listen(this.port, () => console.log("schaad.zip is online"));
    }
}

(async () => {
    new Server().listen();
})()