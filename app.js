const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const config = require('./config/config');
const routes = require('./routes');
const mongoose = require('mongoose');
const compression = require('compression');
const { v4: uuidv4 } = require('uuid');
const Logger = require('./utils/logger.js');
const CustomErrors = require('./utils/errors.js');
const cookieParser = require('cookie-parser');


const logger = new Logger();
const app = express();
app.use(helmet()); // Security headers should be set first.
app.use(cors({ 
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(cookieParser()); // Cookie parser should be added before routes that need access to cookies.
app.use(bodyParser.json()); // Body parser should be before routes that need access to JSON-encoded body data.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(mongoSanitize()); // Sanitize inputs before any request handling.
app.use(compression()); // Compression should come after middleware that alters requests.


process.on('SIGINT', () => {
	logger.log('stopping the server', 'info');
	process.exit();
});


app.use((req, res, next) => {
	req.identifier = uuidv4();
	const logString = `a request has been made with the following uuid [${req.identifier}] ${req.url} ${req.headers['user-agent']} ${JSON.stringify(req.body)}`;
	logger.log(logString, 'info');
	next();
});


app.use(require('./routes'));

const mongoURI = config.env.dbURI;

mongoose.connect(mongoURI).then(() => {
    console.log("[+] Connected to MongoDB")
    app.listen(config.env.port, () => console.log(`[+] Server is running in ${config.env.envName} environment on port ${config.env.port}`))
})
.catch(error => {
	const logString = error;
	const customError = new CustomErrors(error);

	logger.log(logString, 'error')
	customError.error(error, 'databaseError');
});