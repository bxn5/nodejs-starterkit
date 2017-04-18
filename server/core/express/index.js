// module dependencies
const express     = require('express');
const morgan      = require('morgan');
const cors        = require('cors');
const compression = require('compression');
const bodyParser 	= require('body-parser');

// Creating Express Server
const app = express();

app.use(morgan('dev'));
app.use(cors());

app.set('port', config.environment.port);
app.set('env', config.environment.env);

app.use(compression());

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.use('/public', express.static(__root + '/public'));

module.exports = app;