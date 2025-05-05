const express = require('express');
const AnalyticsService = require('../../Service/AnalyticsService');

class AnalyticsController
{
    constructor()
    {
        this.router = express.Router();
        this.analyticsService = new AnalyticsService();

        this.registerAnalyticRoutes();
    }

    registerAnalyticRoutes()
    {
        this.router.post('/api/analytics', (req, res) => {
            this.analyticsService.addPageVisit(req.body, req.headers);
        });
    }

    getRouter()
    {
        return this.router;
    }
}

module.exports = new AnalyticsController();