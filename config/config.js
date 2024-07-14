const dotenv = require('dotenv')

// Initialize environments
let environments = {}

environments.dev = {
    'port': 3001,
    'envName': 'dev',
}

environments.prod = {
    'port': 4001,
    'envName': 'prod',
}


// Current environment fetched from command given to run
let currentEnv = process.env.NODE_ENV || ''

// Checking if currentEnv exists in the above enironments directory
let exportEnv = typeof (environments[currentEnv.trim().toLowerCase()]) === 'object' ? {
    "env": environments[currentEnv.trim().toLowerCase()],
} : {
    "env": environments.dev,
};


module.exports = exportEnv
