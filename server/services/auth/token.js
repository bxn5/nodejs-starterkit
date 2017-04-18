// module dependencies
const jwt   = require('jsonwebtoken');
const User  = require(`${__models}/User`);

/**
 * Token service
 */
class TokenService {
  /**
   * Sign a token
   * @param obj {Object} {id}
   * @return {String} signed token
   */
  signToken(obj){
    let secret = config.environment.jwt.secret;

    let opts = {
      audience: config.environment.jwt.audience,
      issuer: config.environment.jwt.issuer
    }

    return jwt.sign(obj, secret, opts)
  }

  /**
   * Check a token from the request
   * @param token {String} token
   * @return {Promise} user object / error
   */
  verifyToken(token){
    if (!token){
      let error = new ApiError(400, vars.validator.token)
      return Promise.reject(error)
    }

    return new Promise((resolve,reject) => {
      let {
        secret,
        issuer,
        audience,
      } = config.environment.jwt;

      jwt.verify(token, secret, {
        issuer,
        audience
      }, (err, decoded) => {
        if (err){
          let error = new ApiError(400, vars.validator.invalidToken);
          reject(error)
        }
        
        else {
          User.findById(decoded.id)
            .then(user => {
              resolve(user)
            })
            .then(null, err => {
              let error = new ApiError(400, vars.validator.invalidToken)
              reject(error)
            })
        }
      });
    });
  }
}

module.exports = new TokenService();