const taskQueue = require('../queue');
const taskPull = require('./taskPull');

taskQueue.process(async (job) => {
  const { task } = job.data;
  console.log(`Started: ${task}`);
  if (task === 'pull') {
    try {
      await taskPull();
    } catch (err) {
      console.log(err);
    }
  }
  return console.log(`Ended: ${task}`);
});
