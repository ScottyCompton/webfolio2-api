const env = process.env.NODE_ENV.trim();
/*
const path from 'path'';
const chalk = require('chalk')
*/

import path from 'path';
import chalk from 'chalk';


const envPath = (`${process.cwd()}\\.env.${env}`).trim();
require('dotenv').config({ path: envPath})

const appConfig = {
    port: process.env.API_PORT || 9999,
    db_url: process.env.DB_URL || 'mongodb://127.0.0.1:27017/webfolio-api',
    jwt_secret: process.env.JWT_SECRET || 'HJ&ewgwqu$%@ytwIIygtdygweyt^//23e7wqyewg*wquy@AY%tw55U6f5',
    app_env:  env === 'devremote' ? chalk.red(process.env.API_ENV) : chalk.yellow(process.env.API_ENV) || 'no fucking clue....'
}


export default appConfig;