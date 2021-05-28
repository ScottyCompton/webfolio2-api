const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const connURL = process.env.DB_URL || "mongodb://127.0.0.1:27017/webfolio-api";
const connOptions = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}

mongoose.connect(connURL,connOptions);
