

require('dotenv').config();

// config.js
module.exports = {
	app: {
		port: process.env.DEV_APP_PORT || 3001,
		appName: process.env.APP_NAME || 'Oryxie',
		env: process.env.NODE_ENV || 'development',
	},
	db: {
		port: process.env.DB_PORT || 5432,
		database: process.env.DB_NAME || 'iLrn',
		password: process.env.DB_PASS || 'password',
		username: process.env.DB_USER || 'postgres',
		host: process.env.DB_HOST || '127.0.0.1',
		dialect: 'postgres',
		logging: true,
	},
	winiston: {
		logpath: '../logs',
	},
};