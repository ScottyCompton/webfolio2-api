const express = require('express');
const catRouter = require('./category');


// register new routers here
const routeCollection = [
    catRouter
]; 


const router = new express.Router();

const assignRoutes = (app) => {
    routeCollection.forEach((rt) => {
        app.use(rt)
    }) 
}

module.exports = {
    assignRoutes
}

