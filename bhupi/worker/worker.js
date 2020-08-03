const simpleGit = require('simple-git');
const axios = require('axios');
const fs = require('fs').promises;
const difference = require('lodash/difference');
const forEach = require('lodash/forEach');
const map = require('lodash/map');
const taskQueue = require('../queue');

const git = simpleGit('user-contributed', { binary: 'git' });

taskQueue.process(async (job) => {
  const { task } = job.data;
  console.log(`Started: ${task}`);
  if (task === 'pull') {
    await taskPull();
  }
  return console.log(`Ended: ${task}`);
});

async function taskPull() {
  const pullChanges = await pullRemoteRepo();
  reindexGitChanges(pullChanges);
}

async function pullRemoteRepo() {
  return await git.pull('origin', 'development');
}

function reindexGitChanges(pullChanges) {
  const { created, deleted, files } = pullChanges;
  const updated = difference(files, created, deleted);
  const createdFiles = appendGitDirectory(created).filter(onlyJSONFile);
  const updatedFiles = appendGitDirectory(updated).filter(onlyJSONFile);
  const deletedFiles = appendGitDirectory(deleted).filter(onlyJSONFile);
  indexAddFiles(createdFiles);
  indexAddFiles(deletedFiles);
  indexDeleteFiles(deletedFiles);
}

function indexAddFiles(files) {
  console.log("Add/Update files: ", files);
  forEach(files, async (file) => {
    try {
      const jsonContent = await readJSONFile(file);
      console.log(jsonContent);
      const { status, statusText, headers, config } = await postESContent(jsonContent);
      console.log({ status, statusText, headers, config });
    } catch (error) {
      console.error(error);
    }
  });
}

function indexDeleteFiles(files) {
  console.log("Delete files: ", files);
  console.log("Not Implemented");
}

function appendGitDirectory(files) {
  return files.map(file => `user-contributed/${file}`);
}

function onlyJSONFile(filename) {
  console.log(filename);
  return filename.endsWith('.json');
}

async function readJSONFile(file) {
  const res = await fs.readFile(file);
  return Promise.resolve(JSON.parse(res));
}

async function postESContent(jsonContent) {
  const { ES_URL, ES_INDEX, ES_PIPELINE } = process.env;
  const requestPath = `${ES_URL}/${ES_INDEX}/_doc?pipeline=${ES_PIPELINE}`;
  return await axios.post(requestPath, jsonContent);
}
