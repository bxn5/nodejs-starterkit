/**
 * Production specific configuration
 */
module.exports = {
  port: process.env.PORT || 24024,

  mongo: {
    clean: false,
    url: 'mongodb://127.0.0.1/production',
    options: {
      server: {
        auto_reconnect: true
      },
      user: 'lolka1276',
      pass: 'PWNZ76555_nikogda_ne_ugadaesh',
      auth: {
        authdb: 'admin'
      }
    }
  },

  seed: false
}