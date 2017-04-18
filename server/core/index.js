// module dependencies
const express = require('./express');

// render config in console
require('./config').renderConfig();

// connect to database
require('./database').connect();

module.exports = {
  app: express
};