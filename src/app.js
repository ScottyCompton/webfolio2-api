/*
require('./db/mongoose');
const cfg = require('./helpers/appconfig');
const chalk = require('chalk');
const express = require('express');
const routes = require('./routers/routers');
const cors = require('cors');
*/

import './db/mongoose';
import cfg from './helpers/appconfig'
import chalk from 'chalk';
import express from 'express';
import assignRoutes from './routers';
import cors from 'cors';

const app = express();


app.use(cors());
app.use(express.json());
assignRoutes(app);


app.listen(cfg.port, () => {
    const log =  console.log;
    const red = chalk.red;
    const green = chalk.green;
    const yellow = chalk.yellow;

    console.clear();
    log(green('\n\n> Starting up WebFolio API...\n\n'))
    log(`${green(`> Data Source:........`)} ${yellow(cfg.db_url)}`);
    log(`${green(`> Environment:.....`)} ${cfg.app_env}`)
    log('\n\nAPI server running on port ' + cfg.port + ' - yay!');
});

