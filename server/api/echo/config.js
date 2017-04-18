// module dependencies
const echoMiddleware = require(`${__middlewares}/echo`);

/**
 * Config with API points definitions
 * @type {Object}
 */
module.exports = {
	echo: {
		path: '/', 
		method: 'get',
		middlewares: [
			echoMiddleware
		]
	}
}