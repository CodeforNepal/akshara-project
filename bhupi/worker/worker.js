const simpleGit = require('simple-git');
const { Client: ElasticClient } = require('@elastic/elasticsearch')
const fs = require('fs').promises;
const difference = require('lodash/difference');
const forEach = require('lodash/forEach');
const map = require('lodash/map');
const replaceall = require('replaceall');
const taskQueue = require('../queue');

const git = simpleGit('user-contributed', { binary: 'git' });
const elasticClient = new ElasticClient({ node: process.env.ES_URL });

taskQueue.process(async (job) => {
  const { task } = job.data;
  console.log(`Started: ${task}`);
  if (task === 'pull') {
    try {
      await taskPull();
    } catch (e) {
      console.error(e);
    }
  }
  return console.log(`Ended: ${task}`);
});

async function taskPull() {
  const pullChanges = await pullRemoteRepo();
  await elasticClient.deleteByQuery({
    index: process.env.ES_INDEX,
    body: {
      "author": "विद्यापति",
    }
  })
  await reindexGitChanges(pullChanges);
}

async function pullRemoteRepo() {
  return await git.pull('origin', 'development');
}

async function reindexGitChanges(pullChanges) {
  const { created, deleted, files } = pullChanges;
  const updated = difference(files, created, deleted);
  const createdFiles = appendGitDirectory(created).filter(onlyJSONFile);
  const updatedFiles = appendGitDirectory(updated).filter(onlyJSONFile);
  const deletedFiles = appendGitDirectory(deleted).filter(onlyJSONFile);
  await indexAddFiles(createdFiles);
  await indexAddFiles(deletedFiles);
  indexDeleteFiles(deletedFiles);
}

async function indexAddFiles(files) {
  console.log("Add/Update files: ", files);
  return Promise.all(files.map(async (file) => {
    try {
      const jsonContent = await readJSONFile(file);
      console.log(jsonContent);
      const { status, statusText } = await postESContent(jsonContent);
      Promise.resolve({ status, statusText });
    } catch (error) {
      console.error(error.response);
      Promise.reject(error);
    }
  }));
}

function indexDeleteFiles(files) {
  console.log("Delete files: ", files);
  console.log("Not Implemented");
}

function appendGitDirectory(files) {
  return files.map(file => `user-contributed/${file}`);
}

function onlyJSONFile(filename) {
  return filename.endsWith('.json') || filename.endsWith('.json"');
}

function genContentId({ lang, author, title }) {
  return `${lang}-${author}-${title}`;
}

async function readJSONFile(file) {
  const res = await fs.readFile(file);
  return Promise.resolve(JSON.parse(res));
}

async function postESContent(jsonContent) {
  const { ES_URL, ES_INDEX, ES_PIPELINE } = process.env;
  return await elasticClient.index({
      id: genContentId(jsonContent),
      index: ES_INDEX,
      pipeline: ES_PIPELINE,
      body: jsonContent
  })
}
