const simpleGit = require('simple-git');
const myFirstQueue = require('../queue');

const git = simpleGit('user-contributed', { binary: 'git' });

myFirstQueue.process(async (job) => {
  const { task } = job.data;
  console.log(`Started: ${task}`);
  if (task === 'pull') {
    const res = await git.pull('origin', 'master');
    console.log(res);
  }
  return console.log(`Ended: ${task}`);
});
