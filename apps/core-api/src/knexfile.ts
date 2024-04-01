import { env } from './common/utils/envConfig';
import path from 'path';

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: env.DB_HOST,
      port: env.DB_PORT,
      user: env.DB_USER,
      password: env.DB_PASSWORD,
      database: env.DB_NAME,
    },
    migrations: {
      directory: path.resolve(__dirname, 'migrations'),
    },
    useNullAsDefault: true,
  },
  production: {
    client: 'pg',
    connection: {
      host: env.DB_HOST,
      port: env.DB_PORT,
      user: env.DB_USER,
      password: env.DB_PASSWORD,
      database: env.DB_NAME,
      ssl: {
        rejectUnauthorized: false,
      },
    },
    migrations: {
      directory: path.resolve(__dirname, 'migrations'),
    },
  },
};
