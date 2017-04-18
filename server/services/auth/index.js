// module dependencies
const User    = require(`${__models}/User`);
const $token  = require('./token');

/**
 * Auth service
 */
class AuthService {
  /**
   * Get user's access to the certain API points
   * @param availableRoles {Array} 
   * @return {Error / next}
   */
  apiAccess(availableRoles = []) {
    return (req, res, next) => {
      if (availableRoles.length == 0) return next();

      let token = this._getTokenFromHeader(req);

      $token
        .verifyToken(token)
        .then(user => {
          let role = user.profile.role;

          if (availableRoles.indexOf(role) > -1) {
            req.isAuthenticated = true;
            req.user = user;
            next();
          } 

          else {
            let error = new ApiError(403);

            next(error)
          }
        })
        .then(null, err => {
          let error = new ApiError(400, err);
          next(error)
        });
    }
  }

  /**
   * Get token from header
   * @param req {Object} Request
   * @return {String / null} token
   */
  _getTokenFromHeader(req){
    if (req.body.authorization)
      return req.body.authorization

    else if (req.headers.authorization)
      return req.headers.authorization;

    else if (req.query && req.query.token)
      return req.query.token;
    
    else 
      return null;
  }
}

module.exports = new AuthService();