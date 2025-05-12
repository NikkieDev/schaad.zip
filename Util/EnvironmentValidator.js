const required = [
    'PORT',
    'SECRET',
    'APP_ENV',
    'API_URL',
];

class EnvironmentValidator
{
    static verifyAllRequired()
    {
        const missing = [];
        required.forEach(v => !process.env[v] ? missing.push(v) : null);

        if (0 > missing.length) {
            console.log("Unable to start server, missing variables:");
            missing.forEach(v => console.log(v));
            process.exit(-1);
        }
    }
}

module.exports = EnvironmentValidator;