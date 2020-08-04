const fs = require('fs').promises;
const difference = require('lodash/difference');
const forEach = require('lodash/forEach');
const map = require('lodash/map');
const replaceall = require('replaceall');
const git = require('../utils/git');
const elasticClient = require('../utils/es');

async function taskPull() {
  const pullChanges = await pullRemoteRepo();
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
      const { status, statusText } = await postESContent(genContentId(file), jsonContent);
      Promise.resolve({ status, statusText });
    } catch (error) {
      console.error(error);
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

function genContentId(fileFullPath) {
  return replaceall('/', '-', fileFullPath.replace('user-contributed/', '').replace('.json', ''));
}

async function readJSONFile(file) {
  const res = await fs.readFile(file);
  return Promise.resolve(JSON.parse(res));
}

async function postESContent(id, jsonContent) {
  const { ES_URL, ES_INDEX, ES_PIPELINE } = process.env;
  return await elasticClient.index({
      id,
      index: ES_INDEX,
      pipeline: ES_PIPELINE,
      body: jsonContent
  })
}

module.exports = taskPull;
