import { envs } from '../src/commons/constants/envs.constants';

export const config = {
  datasources: {
    db: {
      url: envs.DATABASE_URL,
    },
  },
};
