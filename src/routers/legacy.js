/*
const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth');
const multer = require('multer');
const importPortfolioData = require('../fixtures/import-legacy-portfolio-data');
const importSliderData = require('../fixtures/import-legacy-slider-data');
const importSettingsData = require('../fixtures/import-legacy-settings-data');
*/


import express from 'express';
import auth from '../middleware/auth';
import multer from 'multer';
import PortfolioData from '../fixtures/import-legacy-portfolio-data';
import SliderData from '../fixtures/import-legacy-slider-data';
import SettingsData from '../fixtures/import-legacy-settings-data';

const router = new express.Router();


const upload = multer(
    {
        limits: {
            fileSize: 1024000
        },
        fileFilter(req, file, cb) {
            if(!file.originalname.match(/\.json$/)) {
                return cb(new Error('Please upload a valid JSON data file'))
            }
            cb(undefined, true);
        }
    })

const uploadError = (error, req, res, next) => {
    res.status(400).send({error: error.message});
};



router.post('/legacy-import',auth, upload.single('rawdata'), async (req, res) => {

    try {
        const rawData = await req.file.buffer;

        if(!rawData) {
            return res.status(400).send();
        }
    
        let jsonData = JSON.parse(rawData);
          
        await importPortfolioData(req, res, jsonData.portfolio, jsonData.categories);
        await importSliderData(jsonData.settings.sliderImgs);
        await importSettingsData(jsonData.settings);

        res.send('Data import complete!');

    } catch (error) {
        res.status(400).send({error: error.message});
    }


}, uploadError);

export default router;



