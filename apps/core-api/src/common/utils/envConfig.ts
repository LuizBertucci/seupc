import dotenv from 'dotenv';
import path from 'path';

const environment = process.env.NODE_ENV || 'development';

dotenv.config({
  path: path.join(__dirname, `../../../.docker/${environment}/.env`),
});

import { cleanEnv, host, port, str } from 'envalid';

export const env = cleanEnv(process.env, {
  NODE_ENV: str({ choices: ['development', 'production', 'test'], default: 'development' }),
  HOST: host({ default: 'localhost' }),
  PORT: port({ default: 8080 }),
  CORS_ORIGIN: str({ default: 'http://localhost:8080' }),
  DB_HOST: str(),
  DB_PORT: port(),
  DB_USER: str(),
  DB_PASSWORD: str(),
  DB_NAME: str(),
});
