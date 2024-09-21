require('dotenv').config();
// Initialize environments
let environments = {}

environments.dev = {
    'port': process.env.DEV_APP_PORT,
    'dbURI': process.env.DEV_DB_CONNECTION_URI,
    'appName': process.env.DEV_APP_NAME,
    'logPath': '../log',
    'envName': 'dev',
}

environments.prod = {
    'port': process.env.PROD_APP_PORT,
    'dbURI': process.env.PROD_DB_CONNECTION_URI,
    'appName': process.env.PROD_APP_NAME,
    'logPath': '../log',
    'envName': 'prod',
}


// Current environment fetched from command given to run
let currentEnv = process.env.NODE_ENV || 'dev'

// Checking if currentEnv exists in the above enironments directory
let exportEnv = typeof (environments[currentEnv.trim().toLowerCase()]) === 'object' ? {
    "env": environments[currentEnv.trim().toLowerCase()],
} : {
    "env": environments.dev,
};

module.exports = exportEnv
