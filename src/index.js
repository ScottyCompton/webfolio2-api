
require('./db/mongoose');
const express = require('express');
const routes = require('./routers/routers');

const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());
routes.assignRoutes(app);



app.listen(port, () => {
    //console.clear();
    console.log('\n\nStarting up WebFolio API...')
    console.log('\n\nAPI server running on port ' + port + ' - yay!');
});

