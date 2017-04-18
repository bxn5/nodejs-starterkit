process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var server = require('./server');

// Start server
server.listen(server.get('port'), () => {
  logger.server('Server started on %d, in %s mode',
    server.get('port'),
    server.get('env')
  );
});