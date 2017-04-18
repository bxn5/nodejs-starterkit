/*
  Currently useing this error class in api
*/
class ApiError extends Error {
  /**
   * @param cs {Number} code status
   * @param msg {String} message
   * @param props {String} additional props
   */ 
  constructor(cs, msg, props) {
    if (msg instanceof Error || typeof msg == 'object'){

      msg = msg.message || msg.msg || '';
      super(msg)
    } else {
      super(msg);
    }

    // if CODE/STATUS exist
    if (cs){
      if (typeof cs == 'number'){
        this.code = cs;
        this.status = this.getStatusByCode(cs)
      }

      if (typeof cs == 'string'){
        this.status = cs;
        this.code = this.getCodeByStatus(cs)
      }
    }

    if (!this.code || !this.status) {
      this.code = this.getCodeByStatus()
      this.status = this.getStatusByCode()
    }

    this.name = this.constructor.name;

    if (props)
      this.properties = props;
  }

  /**
   * @param  {Number} code status
   * @return {String} message
   */
  getStatusByCode(code){
    switch (code) {
      case 200:
        return vars.api.status.ok
      case 201:
        return vars.api.status.created
      case 202:
        return vars.api.status.accepted
      case 203:
        return vars.api.status.partial
      case 204:
        return vars.api.status.nores
      case 400:
        return vars.api.status.badreq
      case 401:
        return vars.api.status.unauthorized
      case 402:
        return vars.api.status.paymentrequired
      case 403:
        return vars.api.status.forbidden
      case 404:
        return vars.api.status.notfound
      case 500:
        return vars.api.status.internalerr
      case 501:
        return vars.api.status.notimpl
      case 502:
        return vars.api.status.overloaded
      case 503:
        return vars.api.status.timeout
      default:
        return vars.api.status.internalerr
    }
  }

  /**
   * @param status {String} message
   * @return {Number} code status
   */
  getCodeByStatus(status){
    switch (status) {
      case vars.api.status.ok:
        return 200
      case vars.api.status.created:
        return 201
      case vars.api.status.accepted:
        return 202
      case vars.api.status.partial:
        return 203
      case vars.api.status.nores:
        return 204
      case vars.api.status.badreq:
        return 400
      case vars.api.status.unauthorized:
        return 401
      case vars.api.status.paymentrequired:
        return 402
      case vars.api.status.forbidden:
        return 403
      case vars.api.status.notfound:
        return 404
      case vars.api.status.internalerr:
        return 500
      case vars.api.status.notimpl:
        return 501
      case vars.api.status.overloaded:
        return 502
      case vars.api.status.timeout:
        return 503
      default:
        return 500
    }
  }

  /**
   * Transforms errors to the instance of ApiError
   * @param  {Object} err
   * @return {Object} ApiError instance
   */
  transform(err) {
    let message = vars.api.status.internalerr;
    let code = 500;
    let props;

    switch(err.code){
      case 'LIMIT_FILE_SIZE':
        message = vars.multer.size; 
        code = 400;
        break;
    }

    if (!(err instanceof ApiError)){
      switch(err.constructor.name){
        case 'MongooseError':
          message = vars.validator.validation; 
          code = 400;
          props = err.errors;
          break;
        default:
          logger.error(err.stack);
          break;
      }

      err = new ApiError(
        code,
        message,
        props
      );
    }

    logger.api(err.message)

    return err;
  }
}


module.exports = {
  ApiError
}