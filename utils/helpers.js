const Logger = require('./logger');
const CustomErrors = require('./errors');


const customErrorandLog = (errorType, errorMessage, logString, logType) => {
    const logger = new Logger();
    const customError = new CustomErrors(errorMessage);

    logger.log(logString, logType);
    customError.error(errorType, errorMessage);
}

module.exports = {
    customErrorandLog,
}