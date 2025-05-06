const path = '/api/analytics/';

class Analytics
{
    static #instance

    static getInstance()
    {
        return this.#instance ??= new Analytics();
    }

    constructor()
    {
        this.startTime = new Date().getTime();
        this.blurredCount = 0;

        this.parts = {
            timesBlurred: 0,
            totalTimeOnPage: 0,
            events: [],
            visitOrigin: '',
        };

        document.addEventListener('visibilitychange', this.handlePageClose.bind(this));
        window.addEventListener('blur', this.incrementBlurredCount.bind(this));
    }

    incrementBlurredCount()
    {
        this.blurredCount++;
    }

    calculateTotalTimeInSeconds()
    {
        return (this.stopTime - this.startTime) / 1000;
    }

    handlePageClose()
    {
        if (document.visibilityState !== 'hidden') {
            return;
        }

        this.stopTime = new Date().getTime();

        this.buildAnalytics()
        this.send();
    }

    buildAnalytics()
    {
        this.parts['totalTimeOnPage'] = this.calculateTotalTimeInSeconds();
        this.parts['timesBlurred'] = this.blurredCount;
        this.parts['visitOrigin'] = document.referrer;
    }

    addEvent(eventData)
    {
        this.parts['events'].push(eventData);
    }

    send()
    {
        const body = new Blob([JSON.stringify(this.parts)], { type: 'application/json' })
        navigator.sendBeacon(path, body);
    }
}

Analytics.getInstance();