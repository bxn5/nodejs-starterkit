// module dependencies
const path = require('path');

/**
 * Global variables
 */
global.__root 				= path.join(__dirname, '../');
global.__server				= __dirname;
global.__core 				= __dirname + '/core';
global.__api 					= __dirname + '/api';
global.__models 			= __dirname + '/models';
global.__services 		= __dirname + '/services';
global.__middlewares 	= __dirname + '/middlewares';
// configs
global.config 		= require('./core/config');
global.vars 			= require('./core/config/var');
// services
global.logger 		= require(`${__core}/utils/logger`);
// classes
global.ApiError 	= require(`${__core}/errors`).ApiError;

// core
const app = require('./core').app;
const api = require('./core/api');

app.use(api);

module.exports = app;