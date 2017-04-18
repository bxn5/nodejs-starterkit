/**
 * Config with API points definitions
 * @type {Object}
 */
module.exports = {
	profile: {
		path: '/profile',
		method: 'get',
		access: [
			'ADMIN',
			'USER'
		]
	},

	login: {
		path: '/login',
		method: 'post'
	},

	register: {
		path: '/register',
		method: 'post'
	}
}