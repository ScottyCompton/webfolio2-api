const Settings = require('../models/settings');


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


module.exports = {
    updateSettings,
    getSettings,
}