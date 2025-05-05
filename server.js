const express = require('express');
require('dotenv').config();

const analyticsController = require('./Controller/api/AnalyticsController');

class Server
{
    constructor() {
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
    }

    listen() {
        this.app.listen(this.port, () => console.log("schaad.zip is online"));
    }
}

new Server().listen();