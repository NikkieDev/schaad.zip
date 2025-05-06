const express = require('express');
const AnalyticsService = require('../Service/AnalyticsService');

class BaseController
{
    #router = express.Router();
    #analytics = new AnalyticsService();

    getRouter()
    {
        return this.#router;
    }

    getAnalytics()
    {
        return this.#analytics;
    }

    register() {}
}

module.exports = BaseController;