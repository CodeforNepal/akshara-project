const git = require('../utils/git');

async function taskPush() {
  console.log('git pull origin');
  await git.pull('origin', 'development')
  console.log('git push origin');
  await git.push('origin', 'development')
}

module.exports = taskPush;
