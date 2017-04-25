// module dependencies
const generator = require(`${__services}/generator`);
const fs = require('fs');

class genController {
  index (req, res, next) {
    generator.generate('User');
  }
}

module.exports = new genController();