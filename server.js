const express = require('express');
require('dotenv').config();

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
        this.app.use((req, res, next) => {
            res.setHeader("server", "Kubyx");
            res.removeHeader('X-powered-by');

            next();
        })
    }

    initializeRoutes() {
        this.app.get('/', (req, res) => res.sendFile(__dirname + '/public/pages/home.html'));
    }

    listen() {
        this.app.listen(this.port, () => console.log("schaad.zip is online"));
    }
}

new Server().listen();