const Bull = require("bull");

module.exports = new Bull('bhupi_task_queue_0', `${process.env.REDIS_URL}/0`);
