const simpleGit = require('simple-git');

const git = simpleGit('user-contributed', { binary: 'git' });

module.exports = git;
