const mongoose = require('mongoose');
const connURL = 'mongodb://127.0.0.1:27017/webfolio-api';
const connOptions = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}

mongoose.connect(connURL,connOptions);
