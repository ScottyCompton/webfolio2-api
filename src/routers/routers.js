const express = require('express');
const catRouter = require('./category');
const settingsRouter = require('./settings');
const sliderImgRouter = require('./sliderImg');

// register new routers here
const routeCollection = [
    catRouter,
    settingsRouter,
    sliderImgRouter
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

