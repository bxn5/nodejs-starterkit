// module dependencies
const generator = require(`${__services}/generator`);
const fs = require('fs');

class genController {
  index (req, res, next) {
    generator.generate('Post');
    let status = vars.api.status.ok;
    res.json({status});
  }
}

module.exports = new genController();