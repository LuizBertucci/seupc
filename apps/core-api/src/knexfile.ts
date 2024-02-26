const path = require('path');

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      user: 'postgres',
      password: 'PgAdmin2024!',
      database: 'postgresdb-seupc-dev',
    },
    migrations: {
      directory: path.resolve(__dirname, 'migrations'),
    },
    useNullAsDefault: true,
  },
};
