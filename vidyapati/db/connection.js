const knexfile = require('../knexfile');

const connection = knexfile[process.env.NODE_ENV].connection;

const connString = `postgresql://${connection.user}:${connection.password}@${connection.host}/${connection.database}`;

console.log(connString);

const knex = require('knex')({
  client: 'pg',
  connection: connString,
  searchPath: ['$user', 'public']
});

module.exports = knex;
