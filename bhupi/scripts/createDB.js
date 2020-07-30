const knex = require('../db/connection');
const knexfile = require('../knexfile');

const database_name = knexfile[process.env.NODE_ENV].connection.database;

knex.raw(`CREATE DATABASE ${database_name};`)
  .then(function() {
    return knex.raw(`DROP DATABASE ${database_name};`)
  })
  .finally(function () {
    console.log("Done");
  });
