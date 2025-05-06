class Cookies
{
    constructor() {
        this.banner = document.querySelector('.cookie-wrapper');
        this.acceptButton = document.querySelector(`.btn[data-role='cookie-button'][data-value='accept']`);
        this.denyButton = document.querySelector(`.btn[data-role='cookie-button'][data-value='deny']`);
        this.cookies = [];

        this.acceptButton.addEventListener('click', this.acceptCookies.bind(this));
        this.denyButton.addEventListener('click', this.closeBanner.bind(this));

        if (this.cookiesAccepted())
        {
            this.closeBanner();
            this.cookies = this.getCookiesAsMap();

            Analytics.getInstance().setId(this.findCookie('Cookie-ID'));
        }
    }

    getCookiesAsMap()
    {
        return document.cookie.split('; ').reduce((cookies, item) => {
            const [key, value] = item.split('=');
            cookies[key] = decodeURIComponent(value);
            return cookies;
        }, {});
    }

    findCookie(name)
    {
        return this.cookies[name];
    }

    addCookie(cookieName, cookieValue)
    {
        const expireDate = new Date();
        expireDate.setTime(expireDate.getTime() + 365 * (1000 * 86400));

        const cookieContent = `${cookieName}=${cookieValue};expires=${expireDate.toUTCString()}`;

        document.cookie = cookieContent;
        this.cookies = this.getCookiesAsMap();
    }

    cookiesAccepted()
    {
        return localStorage.getItem('cookies') === 'accepted';
    }

    closeBanner()
    {
        this.banner.classList.add('hidden');
    }

    async createIdentifier()
    {
        console.log("Creating!!!");
        alert("Creating!!");

        try {
            const response = await fetch('/api/cookie/', {
                method: 'GET',
                headers: {
                    'x-screen-resolution': `${window.screen.width}x${window.screen.height}`,
                    'x-device-mem': navigator.deviceMemory,
                }
            });

            console.log(response.status, response.headers);
            if (200 !== response.status || !response.headers.get('content-type').includes('application/json')) {
                console.log("Mismatc h");
                return null;
            }

            const responseData = await response.json();
            const identifier = responseData['data']['identifier'];

            return identifier;
        } catch (error) {
            console.log('Unable to create a cookie identifier.');
            return '';
        }
    }

    async acceptCookies()
    {
        const identifier = await this.createIdentifier();

        if (identifier) {
            this.addCookie('Cookie-ID', identifier);

            localStorage.setItem('cookies', 'accepted');
            location.reload();
        }
    }
}

new Cookies();