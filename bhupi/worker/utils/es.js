const { Client: ElasticClient } = require('@elastic/elasticsearch')
const replaceall = require('replaceall');

const elasticClient = new ElasticClient({ node: process.env.ES_URL });

function genContentId(fileFullPath) {
  return replaceall('/', '-', fileFullPath.replace('user-contributed/', '').replace('.json', ''));
}

module.exports = {
  elasticClient,
  genContentId,
};
