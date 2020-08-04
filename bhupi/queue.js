const Bull = require("bull");
const { setQueues } = require('bull-board')

const bhupiTaskQueue = new Bull('bhupi_task_queue_0', `${process.env.REDIS_URL}/0`);

setQueues([bhupiTaskQueue]);

module.exports = bhupiTaskQueue;
