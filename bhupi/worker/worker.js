const taskQueue = require('../queue');
const taskPull = require('./taskPull');
const taskPush = require('./taskPush');
const taskCreateContent = require('./taskCreateContent');

taskQueue.process(async (job) => {
  const res = await taskQueue.getRepeatableJobs();
  console.log(res);
  const { task } = job.data;
  console.log(`Started: ${task}`);
  if (task === 'pull') {
    await taskPull();
  }
  if (task === 'push') {
    await taskPush();
  }
  if (task == 'create_content') {
    await taskCreateContent(job.data.body);
  }
  return console.log(`Ended: ${task}`);
});
