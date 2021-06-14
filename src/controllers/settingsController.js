/*
const Settings = require('../models/settings');
const sharp = require('sharp')
*/
import Settings from '../models/settings';
import sharp from 'sharp';


const updateSettings = async (req, res) => {
    const settings = new Settings(req.body); 
    // out with the old...
    const oldSettings = await Settings.deleteMany({});

    // in with the new
    try {
        await settings.save();

        res.status(201).send(settings);
    } catch(error) {
        res.status(400).send(error.message);
    }    
}

const getSettings = async (req, res) => {

    try {
       const settings = await Settings.findOne({});
        res.send(settings);    
    } catch(error) {
        res.status(400).send(error);
    }    
    

}




const uploadAboutImg = async (req, res) => {

    try {
        const aboutImgUrl = `settings/aboutimg`;
        const settings = await Settings.findOne({});
        const buffer = await sharp(req.file.buffer).resize({width: 400, height: 400}).toBuffer();
        settings.aboutImgData = buffer;
        settings.aboutImgUrl = aboutImgUrl;
        await settings.save();
        res.send({aboutImgUrl});
    
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message)
    }
}


const fetchAboutImg = async (req, res) => {

    try {
        const settings = await Settings.findOne({});

        if(!settings) {
            throw new Error({error: 'Setting could not be loaded...'});
        }

        if(settings.aboutImgData) {
            res.set('Content-type', 'image/jpg');
            res.send(settings.aboutImgData);    
        }

    } catch (error) {
        res.status(500).send(error);

    }
}


export {
    updateSettings,
    getSettings,
    uploadAboutImg,
    fetchAboutImg
}