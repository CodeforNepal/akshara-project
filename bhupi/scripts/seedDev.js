const knex = require('../db/connection');

(function run() {
  console.log(">>")
  return knex.migrate.rollback()
    .then(() => { return knex.migrate.latest(); })
    .then(() => { return knex.seed.run(); })
    .then((res) => {
      console.log(res);
    });

})();
