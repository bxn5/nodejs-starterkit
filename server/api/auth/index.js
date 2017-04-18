// module dependencies
const User    = require(`${__models}/User`);
const $auth   = require(`${__services}/auth`);
const $token  = require(`${__services}/auth/token`);

/**
 * Auth controller
 */
class AuthController {  
  /**
   * User authentication
   * @param req {Object} request
   * @param res {Object} response
   * @param next {Function} next
   * @send {Object} response with user's profile and token
   */
  login(req, res, next){
    let {email, password} = req.body;

    User
      .findOne({email, password})
      .then(user => {
        if (!user) {
          let error = new ApiError(404, vars.validator.incorrectCreds);
          return Promise.reject(error)
        }

        let status = vars.api.status.ok;
        let data = {
          profile: user.profile,
          token: $token.signToken({id: user.id})
        }

        res.json({status, data})
      })
      .then(null, error => {
        next(error)
      })
  }

  /**
   * User registration
   * @param req {Object} request
   * @param res {Object} response
   * @param next {Function} next
   * @send {Object} response with user's profile and token
   */
  register(req, res, next){
    let {email, password} = req.body;

    User
      .findOne({email})
      .then(isExist => {
        if (isExist){
          let error = new ApiError(400, vars.validator.userExist);
          return Promise.reject(error);
        }

        return new User({email,password}).save()
      })
      .then(user => {
        let status = vars.api.status.ok;
        let data = {
          profile: user.profile,
          token: $token.signToken({id: user.id})
        }

        res.json({status, data});
      })
      .then(null, error => {
        next(error)
      })
  }

  /**
   * User profile
   * @param req {Object} request
   * @param res {Object} response
   * @param next {Function} next
   * @send {Object} response with user's profile
   */
  profile(req, res, next){
    let _id = req.user._id;

    User.findById(_id)
      .select('profile _id email')
      .then(data => {
        let status = vars.api.status.ok;

        res.json({status, data})
      })
      .then(null, err => {
        let error = new ApiError(401, err);
        next(error);
      })
  }
}

module.exports = new AuthController();