// module dependencies
const path    = require('path');
const fs      = require('fs');
const multer  = require('multer');
const crypto  = require('crypto');
const config  = require('../environment');

module.exports = {
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      let dir = config.uploader.upload_dir

      if (!fs.existsSync(dir)) fs.mkdirSync(dir);
          
      cb(null, dir);
    },

    filename: (req, file, cb) => {
      crypto.pseudoRandomBytes(16, (err, raw) => {
        cb(null, raw.toString('hex') + Date.now() + path.extname(file.originalname).toLowerCase());
      });
    }
  }),

  limits: {
    fieldNameSize: 255,
    fileSize: config.uploader.max_size,
    files: 1,
    fields: 1
  },

  fileFilter: (req, file, cb) => {
    let filetypes = new RegExp(config.uploader.allowed_ext);
    let mimetype = filetypes.test(file.mimetype);
    let extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) return cb(null, true);

    let error = new ApiError(400, vars.multer.formats);

    return cb(error);
  }
}