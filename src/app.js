

import './db/mongoose';
import cfg from './helpers/appconfig'
import chalk from 'chalk';
import express from 'express';
import assignRoutes from './routers';
import cors from 'cors';
const port = process.env.PORT || 3000;


const app = express();


app.use(cors());
app.use(express.json());
assignRoutes(app);



app.listen(port, (err) => {
    const log =  console.log;
    const red = chalk.red;
    const green = chalk.green;
    const yellow = chalk.yellow;

    console.clear();

    if(err) {
        throw err;
    }

    log(green('\n\n> Starting up WebFolio API...\n\n'))
    log(`${green(`> Data Source:........`)} ${yellow(cfg.db_url)}`);
    log(`${green(`> Environment:........`)} ${cfg.app_env}`)
    log('\n\nAPI server running on port ' + cfg.port + ' - yay!');
});

