import 'dotenv/config';
import env from 'env-var';

export const envs = {

  // Server
  PORT: env.get('PORT').default('3000').asPortNumber()


}
