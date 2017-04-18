// module dependencies
const nodemailer = require('nodemailer');

/**
 * Send email class
 * Constructor params defined in config module
 */
class Mailer {
  /**
   * @param transportService {String} service type
   * @param auth {Object} username /password
   */
  constructor(transportService, auth) {
    this.transporter = nodemailer.createTransport({
      service: transportService,
      auth
    });
  }

  /**
   * Send mail method 
   * @param mailOptions {Object} mail object
   * @return {Promise} result of sending
   */
  sendMail(mailOptions) {
    return this.transporter.sendMail(mailOptions);
  }
}

module.exports = new Mailer(
  config.environment.mailer.service,
  {
    user: config.environment.mailer.auth.user,  
    pass: config.environment.mailer.auth.pass
  }
);