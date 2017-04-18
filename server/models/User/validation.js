// module dependencies
const validate = require('mongoose-validator');

module.exports = {
  name: [
    validate({
      validator: 'isLength',
      arguments: [1, 5],
      passIfEmpty: true,
      message: vars.validator.length
    }),
    validate({
        validator: 'isAlphanumeric',
        passIfEmpty: true,
        message: vars.validator.alphanumeric
    })
  ],

  email: [
    validate({
      validator: 'isEmail',
      message: vars.validator.email,
    })
  ],

  password: [
    validate({
      validator: 'isLength',
      arguments: [5, 50],
      message: vars.validator.length
    })
  ],

  lastname: [
    validate({
      validator: 'isLength',
      passIfEmpty: true,
      arguments: [15, 50],
      message: vars.validator.length
    })
  ]
};
