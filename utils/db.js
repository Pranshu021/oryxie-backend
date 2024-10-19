const mongoose = require('mongoose');
const config = require('../config/config');
const Logger = require('./logger');
const CustomError = require('./errors')


const connectDB = async() => {
    const logger = new Logger();
    try {
        await mongoose.connect(config.env.dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("[+] MongoDB connection successful")
    } catch(error) {

        console.error('[-] MongoDB connection Error:', error.message);
        const logString = 'MongoDB connection error while performing backend operation'
        const customError = new CustomError(error)

        logger.log(logString, 'error');
        customError.error(error, 'databaseError');
        process.exit(1);
    }
}

module.exports = connectDB;
