const Bull = require("bull");
const { setQueues } = require('bull-board')

const bhupiTaskQueue = new Bull('bhupi_task_queue_0', `${process.env.REDIS_URL}/0`);

if (process.env.NODE_ENV === 'production') {
  const repeatOpts = {
    repeat: {
      every: 60 * 60 * 1000, // 1 hrs
    }
  };
  // Remove old task repeatable task
  console.log('Remove Old Repeatables');
  bhupiTaskQueue.removeRepeatable(
    'git_push',
    repeatOpts
  );
  // Push to remote every 1 hrs.
  bhupiTaskQueue.add(
    'git_push',
    {
      task: 'push',
    },
    repeatOpts,
  );
}

setQueues([bhupiTaskQueue]);

module.exports = bhupiTaskQueue;
