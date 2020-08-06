const Bull = require("bull");
const { setQueues } = require('bull-board')

const vidyapatiTaskQueue = new Bull('vidyapati_task_queue_0', `${process.env.REDIS_URL}/0`);

if (process.env.NODE_ENV === 'production') {
  const repeatOpts = {
    repeat: {
      every: 60 * 60 * 1000, // 1 hrs
    }
  };
  // Remove old task repeatable task
  console.log('Remove Old Repeatables');
  vidyapatiTaskQueue.removeRepeatable(
    'git_push',
    repeatOpts
  );
  // Push to remote every 1 hrs.
  vidyapatiTaskQueue.add(
    'git_push',
    {
      task: 'push',
    },
    repeatOpts,
  );
}

setQueues([vidyapatiTaskQueue]);

module.exports = vidyapatiTaskQueue;
