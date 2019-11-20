var server = require('pushstate-server');

server.start({
  port: 8080,
  host: '0.0.0.0',
  directory: './build',
});
