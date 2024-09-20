const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const config = require('./config/config');
const routes = require('./routes');
const mongoose = require('mongoose');
const customError = require('./config/errors')
const compression = require('compression');
const { v4: uuidv4 } = require('uuid');
const Logger = require('./utils/logger.js');


const logger = new Logger();
const app = express();
app.use(bodyParser.json());
app.use(compression());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(mongoSanitize());

process.on('SIGINT', () => {
	logger.log('stopping the server', 'info');
	process.exit();
});

// Setting env file according to current environment
if(config.env) {
    require('dotenv').config({path: `./.env.${config.env.envName}`})
} else {
    require('dotenv').config({path: `./.env.dev`})
}

app.use((req, res, next) => {
	req.identifier = uuidv4();
	const logString = `a request has been made with the following uuid [${req.identifier}] ${req.url} ${req.headers['user-agent']} ${JSON.stringify(req.body)}`;
	logger.log(logString, 'info');
	next();
});


app.use(require('./routes'));


const mongoURI = process.env.DB_CONNECTION_URI;

mongoose.connect(mongoURI).then(() => {
    console.log("[+] Connected to MongoDB")
    app.listen(process.env.PORT, () => console.log(`[+] Server is running in ${config.env.envName} environment on port ${process.env.PORT}`))
})
.catch(error => {
    throw new customError(error)
});



