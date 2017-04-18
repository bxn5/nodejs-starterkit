// module dependencies
const winston = require('winston');
const path    = require('path');
const fs      = require('fs');

// create logs folder if doesn't exist
const logs    = path.join(__root, config.logger.path);
if (!fs.existsSync(logs)) fs.mkdirSync(logs);

// set color 
let applyColor = level => {
  let color = config.logger.settings.colors[level]
  let val = config.logger.styles[color];
  
  return `\u001b[${val[0]}m${level}\u001b[${val[1]}m`
}

/**
 * Logger config
 * @type {Object}
 */
const Logger = {
  transports: [
    new(winston.transports.Console)({
      colorize: true,

      timestamp: () => {
        let time = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '').split(' ')[1];
        return `[\u001b[90m${time}\u001b[39m]`
      },

      formatter: options => {
        let timestamp = options.timestamp();
        let level = applyColor(options.level);
        let message = options.message || '';
        let meta = (options.meta && Object.keys(options.meta).length) ? '\n\t'+ JSON.stringify(options.meta) : '';

        return `${timestamp} [${level}] ${message} ${meta}`
      }
    }),

    new(winston.transports.File)({
      filename: path.join(__root, config.logger.path, 'server.log'),
      level: 'error',
      maxsize: config.logger.maxsize
    })
  ],

  levels: config.logger.settings.levels,

  colors: config.logger.settings.colors
}
  
module.exports = new winston.Logger(Logger);