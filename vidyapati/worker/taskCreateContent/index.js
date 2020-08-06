const mkdirp = require('mkdirp');
const fs = require('fs').promises;
const { existsSync } = require('fs');
const git = require('../utils/git');
const { elasticClient, genContentId } = require('../utils/es');

async function taskCreateContent(newContent) {
  const { dir, file } = genPathInfo(newContent);
  const fullPath = `${dir}${file}`
  const doesFileExist = existsSync(fullPath);
  console.log('File exists: ', doesFileExist);
  await createDir(dir);
  await createJSON(fullPath, newContent);
  await commitGit(fullPath.replace('user-contributed/', ''), doesFileExist ? 'Update' : 'Create');
  await indexES(genContentId(fullPath), newContent);
}

function genPathInfo({ lang, author, title }) {
  return {
    dir: `user-contributed/${lang}/${author}/`,
    file: `${title}.json`,
  };
}

async function createDir(dirPath) {
  console.log(`Create directory: ${dirPath}`);
  mkdirp(dirPath);
}

async function createJSON(pathName, jsonContent) {
  console.log(`Create file: ${pathName}`);
  console.log('Content: ', jsonContent);
  return await fs.writeFile(pathName, JSON.stringify(jsonContent));
}

async function commitGit(pathName, actionText) {
  console.log(`git add ${pathName}`)
  const commitMessage = `${actionText} file '${pathName}'`;
  console.log(`git commit -m ${commitMessage}`);
  await git.add([pathName]);
  return await git.commit(commitMessage);
}

async function indexES(id, newContent) {
  console.log('Index in ES');
  const { ES_INDEX, ES_PIPELINE } = process.env;
  return await elasticClient.index({
    id,
    index: ES_INDEX,
    pipeline: ES_PIPELINE,
    body: newContent
  });
}

module.exports = taskCreateContent;
