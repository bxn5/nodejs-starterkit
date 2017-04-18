// module dependencies
const multer = require('multer');

/**
 * Config with API points definitions
 * @type {Object}
 */
module.exports = {
  upload: {
    path: '/image',
    method: 'post',
    middlewares: [
    	multer(config.multer).single('image')
   	]
  }
}