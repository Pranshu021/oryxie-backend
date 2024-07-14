class serverError extends Error {
    constructor(message, statusCode) {
        super(message)
        this.statusCode = 500;
    }
}

module.exports = serverError
