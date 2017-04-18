// module dependencies
const errors = require(`${__root}/server/core/errors`);

const ApiError = errors.ApiError;

describe('ApiError class', function(){
  var error = new ApiError(404, 'Page not found');

  it('new ApiError should be instance of ApiError class', () => {
    error.should.be.an.instanceof(ApiError)
  })

  it('new ApiError should be instance of Error class', () => {
    error.should.be.an.instanceof(Error)
  })

  it('should have status property', () => {
    error.should.have.property('status')
  })

  it ('should have code property', () => {
    error.should.have.property('code')
  })

  it('should have message property', () => {
    error.should.have.property('message')
  })

  it('should have stack property', () => {
    error.should.have.property('stack')
  })

  it('should have status,message,stack,code properties even if nothing passed to constructor', () => {
    var _e = new ApiError();

    _e.should.have.property('status', vars.api.status.internalerr)
    _e.should.have.property('message', '')
    _e.should.have.property('stack')
    _e.should.have.property('code', 500)
  })

  it('should be correct status when you passing only code', () => {
    var errWithCode = new ApiError(404)

    errWithCode.should.have.property('code', 404)
    errWithCode.should.have.property('status', vars.api.status.notfound)
  })

  it('should be correct code when you passing status', () => {
    var errWithStatus = new ApiError(vars.api.status.forbidden)

    errWithStatus.should.have.property('code', 403)
    errWithStatus.should.have.property('status', vars.api.status.forbidden)
  })

  it('should have field properties when you passing to constructor', () => {
    var errorProperties = {
      id: '1234-1234-1234-1234'
    };

    var errWithProperties = new ApiError(404, 'Page not found', errorProperties)

    errWithProperties.should.have.deep.property('properties.id', errorProperties.id);
  })

  it('should have toString method that returns string', () => {
    error.toString().should.be.an('string')
  })

  it('should have all values if passsing error obj as second argument', () => {
    let error_message = 'This is a error';
    let err = new Error(error_message);

    let apiErr = new ApiError(500, err);

    apiErr.should.have.property('message', error_message)
    apiErr.should.have.property('code', 500)
  })

  it('should throw error', () => {
    var fn = function(){ throw error; }

    fn.should.throw(ApiError)
    fn.should.throw(Error)
  })
})