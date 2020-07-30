const Bull = require("bull");

module.exports = new Bull('my-first-queue', 'http://redis:6379/0');
