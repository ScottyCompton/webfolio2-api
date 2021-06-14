import express from 'express';
import catRouter from './category';
import settingsRouter from './settings';
import sliderImgRouter from './sliderImg';
import usersRouter from './user';
import portfolioRouter from './portfolio';
import appDataRouter from './appdata';

// register new routers here
const routeCollection = [
    catRouter,
    settingsRouter,
    sliderImgRouter,
    usersRouter,
    portfolioRouter,
    appDataRouter
]; 


const router = new express.Router();

const assignRoutes = (app) => {
    routeCollection.forEach((rt) => {
        app.use(rt)
    }) 
}

export default assignRoutes;
