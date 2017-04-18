/**
 * Development specific configuration
 */
module.exports = {
  port: 4000,

  mongo: {
  	clean: true,
    url: 'mongodb://127.0.0.1/test'
  },

  seed: true
}