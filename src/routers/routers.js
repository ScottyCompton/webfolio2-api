const express = require('express');
const catRouter = require('./category');
const settingsRouter = require('./settings');

// register new routers here
const routeCollection = [
    catRouter,
    settingsRouter
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

