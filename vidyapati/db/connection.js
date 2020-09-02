const knexfile = require('../knexfile');
const _ = require('lodash');

const connection = knexfile[process.env.NODE_ENV].connection;

const connString = _.isString(connection) ? connection : `postgresql://${connection.user}:${connection.password}@${connection.host}/${connection.database}`;

console.log(connString);

const knex = require('knex')({
  client: 'pg',
  connection: connString,
  searchPath: ['$user', 'public']
});

module.exports = knex;
