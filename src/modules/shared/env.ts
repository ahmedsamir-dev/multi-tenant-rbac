import dotenv from 'dotenv';
import path from 'path';
import * as envalid from 'envalid';

dotenv.config({
  path: path.resolve(
    __dirname,
    process.env.NODE_ENV === 'development' ? '../../../.env.development' : '../../../.env.production',
  ),
});

const env = envalid.cleanEnv(process.env, {
  NODE_ENV: envalid.str({ default: 'development', choices: ['development', 'production'] }),
  PORT: envalid.port({ default: 3000 }),
  POSTGRES_HOST: envalid.str(),
  POSTGRES_USER: envalid.str(),
  POSTGRES_PASSWORD: envalid.str(),
  POSTGRES_DB: envalid.str(),
  POSTGRES_URL: envalid.str({}),
  JWT_SECRET: envalid.str({ default: 'secret' }),
});

export default env;
