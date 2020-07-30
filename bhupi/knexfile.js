// Update with your config settings.

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      host: 'db',
      database: 'sangraha_wiki',
      user:     'sangraha',
      password: 'sangrahapass'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  test: {
    client: 'postgresql',
    connection: {
      host: '127.0.0.1',
      database: 'sangraha_wiki_test',
      user:     'sangraha',
      password: 'sangrahapass'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
