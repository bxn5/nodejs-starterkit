// basic config
const basic = {
  env: process.env.NODE_ENV,

  process: {
    platform: process.platform
  },

  jwt: {
    secret: 'SECRET KEY',
    issuer: 'accounts.test.test',
    audience: 'gls.com'
  },

  lang: {
    default: 'en'
  },
  
  mailer: {
    service: 'gmail',
    auth: {
      user: 'petyaroshen@gmail.com',
      pass: 'speroteck'
    }
  },

  resizer: {
    max_size: 1000, //px
    folder: 'tmp',
    prefix: 'resized_'
  },

  uploader: {
    max_size: 15 * 1000 * 1000, // mb
    allowed_ext: 'jpeg|jpg|png',
    upload_dir: __root + 'tmp'
  }
};

module.exports = Object.assign(
  basic,
  require('./' + (process.env.NODE_ENV ? process.env.NODE_ENV : 'development') + '.js') || {}
);
