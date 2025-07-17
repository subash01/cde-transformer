import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

export const config = {
  port: process.env.PORT || 3000,
  bim360Token: process.env.BIM360_TOKEN,
  procoreToken: process.env.PROCORE_TOKEN,
};