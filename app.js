const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const config = require('./config/config');
const routes = require('./routes');
const mongoose = require('mongoose');
const customError = require('./config/errors')

const app = express();

// Setting env file according to current environment
if(config.env) {
    require('dotenv').config({path: `./.env.${config.env.envName}`})
} else {
    require('dotenv').config({path: `./.env.dev`})
}

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(mongoSanitize());

// Route for users APIs
app.use('/api/users', routes.userRouter)

app.get('/api/test', (req, res) => {
    res.json({ message: 'API working' });
});

const mongoURI = process.env.DB_CONNECTION_URI;

mongoose.connect(mongoURI).then(() => {
    console.log("[+] Connected to MongoDB")
    app.listen(process.env.PORT, () => console.log(`[+] Server is running in ${config.env.envName} environment on port ${process.env.PORT}`))
})
.catch(error => {
    throw new customError(error)
});



