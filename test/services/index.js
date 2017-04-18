// module dependencies
const _ = require('lodash');

/**
 * Service for tests
 */
class TestService {
	/**
	 * Get status code according to the permissions for the API point
	 * @param  {Array} 	permissions [array of roles]
	 * @param  {Object} profile    	[user profile]
	 * @return {Number} code        [expected status code]
	 */
	expectedCode(permissions, profile) {
		if (permissions.indexOf(profile.role) > -1)
			return 200;
		else 
			return 403;
	}
}

const $TestService = new TestService();
module.exports = $TestService;