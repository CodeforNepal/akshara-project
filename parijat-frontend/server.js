var server = require('pushstate-server');

console.log("Starting production server at port 8080");

server.start({
  port: 8080,
  host: '0.0.0.0',
  directory: './build',
})
