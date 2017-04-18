const config = require('../../environment');

module.exports = {
  api: {
    status: {
      /*
        SUCCESS CODES 2xx
        These codes indicate success. The body section if present is the object returned by the request.
        It is a MIME format object. It is in MIME format, and may only be in text/plain, text/html or one fo the formats specified as acceptable in the request.
      */

      /*
        [200] The request was fulfilled.
      */
      ok: 'ok',

      /*
        [201] Following a POST command, this indicates success, but the textual part of the response line indicates the URI by which the newly created document should be known.
      */
      created: 'created',

      /*
        [202] The request has been accepted for processing, but the processing has not been completed.
      */
      accepted: 'accepted',

      /*
        [203] When received in the response to a GET command, this indicates that the returned metainformation is not a definitive set of the object from a server
        with a copy of the object, but is from a private overlaid web. This may include annotation information about the object, for example.
      */
      partial: 'partial invormation',

      /*
        [204] Server has received the request but there is no information to send back, and the client should stay in the same document view.
      */
      nores: 'no response',

      /*
        ERROR CODES 4xx, 5xx
        The 4xx codes are intended for cases in which the client seems to have erred,
        and the 5xx codes for the cases in which the server is aware that the server has erred.
      */

      /*
        [400] The request had bad syntax or was inherently impossible to be satisfied.
      */
      badreq: 'bad request',

      /*
        [401] The parameter to this message gives a specification of authorization schemes which are acceptable.
        The client should retry the request with a suitable Authorization header.
      */
      unauthorized: 'unauthorized',

      /*
        [402] The parameter to this message gives a specification of charging schemes acceptable.
        The client may retry the request with a suitable ChargeTo header.
      */
      paymentrequired: 'payment required',

      /*
        [403] The request is for something forbidden.
        Authorization will not help.
      */
      forbidden: 'forbidden',

      /*
        [404] The server has not found anything matching the URI given
      */
      notfound: 'not found',

      /*
        [500] The server encountered an unexpected condition which prevented it from fulfilling the request.
      */
      internalerr: 'internal error',

      /*
        [501] The server does not support the facility required.
      */
      notimpl: 'not implemented',

      /*
        [502] The server cannot process the request due to a high load (whether HTTP servicing or other requests).
        The implication is that this is a temporary condition which maybe alleviated at other times.
      */
      overloaded: 'overloaded',

      /*
        [503] This is equivalent to Internal Error 500, but in the case of a server which is in turn accessing some other service,
        this indicates that the respose from the other service did not return within a time that the gateway was prepared to wait.
        As from the point of view of the clientand the HTTP transaction the other service is hidden within the server,
        this maybe treated identically to Internal error 500, but has more diagnostic value.
      */
      timeout: 'gateway timeout',

      /*
        [550] The server is stating the account you have currently logged in as does not have permission to perform the action you are attempting.
      */
      denied: 'permission denied',
    }
  },

  multer: {
    formats: 'File upload only supports the following filetypes: ' + config.uploader.allowed_ext,
    size: 'File size is too big. Max allowed size is: ' + config.uploader.max_size / 1000000 + 'Mb',
  },

  validator: {
    validation: 'Validation failed',
    token: 'No token provided',
    invalidToken: 'invalid token',
    incorrectCreds: 'Incorrect login or password',
    userExist: 'User with same email already exists',
    length: '{PATH} should be between {ARGS[0]} and {ARGS[1]} characters',
    email: 'Wrong Email format',
    alphanumeric: '{PATH} should contain alpha-numeric characters only',
    required: '{PATH} is required'
  }
}