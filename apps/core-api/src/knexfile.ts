import { env } from './common/utils/envConfig';
import path from 'path';

module.exports = {
  development: {
    client: 'pg',
    connection: env.DATABASE_URL,
    migrations: {
      directory: path.resolve(__dirname, 'migrations'),
    },
    useNullAsDefault: true,
  },
  production: {
    client: 'pg',
    connection: env.DATABASE_URL,
    migrations: {
      directory: path.resolve(__dirname, 'migrations'),
    },
    ssl: { rejectUnauthorized: false },
  },
};
