const { Client: ElasticClient } = require('@elastic/elasticsearch')

const elasticClient = new ElasticClient({ node: process.env.ES_URL });

module.exports = elasticClient;
