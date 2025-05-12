module.exports = class ApiUnauthorizedError extends Error {
    constructor(msg) {
        super(msg);
        this.name = 'ApiUnauthorizedError';
    }
};