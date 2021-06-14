import mongoose from 'mongoose';
import cfg from '../helpers/appconfig';

const connOptions = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}

mongoose.connect(cfg.db_url ,connOptions);
