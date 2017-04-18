// module dependencies
const $imager = require(`${__services}/imager`);

class imageController {
  upload (req, res, next) {
    res.json(req.file);
  }
}

module.exports = new imageController();