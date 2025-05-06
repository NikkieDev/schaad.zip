class Cookies
{
    constructor() {
        this.banner = document.querySelector('.cookie-wrapper');
        this.acceptButton = document.querySelector(`.btn[data-role="cookie-button"][data-value="accept"]`);
        this.denyButton = document.querySelector(`.btn[data-role="cookie-button"][data-value="deny"]`);
        this.cookies = [];

        this.acceptButton.addEventListener('click', this.acceptCookies.bind(this));
        this.denyButton.addEventListener('click', this.closeBanner.bind(this));

        if (this.cookiesAccepted())
        {
            this.closeBanner();
            this.cookies = this.getCookiesAsMap();

            Analytics.getInstance();
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

    addCookie(cookieName, cookieValue)
    {
        const date = new Date();
        const expireDate = new Date(date.setTime(date.getTime() + (1000 * 86400)));

        document.cookie = `${cookieName}=${cookieValue};expires=${expireDate.toUTCString()}`;
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

    acceptCookies()
    {
        localStorage.setItem('cookies', 'accepted');
        location.reload();
    }
}

new Cookies();