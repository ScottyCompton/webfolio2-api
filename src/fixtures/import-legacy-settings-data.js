import Settings from '../models/settings';





require('../db/mongoose');
const SliderImg = require('../models/sliderImg.js');


const importSettingsData = async (settingsData) => {
    console.log('\n\nExecuting legacy settings data import...\n===============================================');

    await Settings.deleteMany({});

    settings = new Settings({
        ...settingsData,
        aboutImgUrl: settingsData.aboutImg
    });
    await settings.save();
    console.log('\nImported legacy settings data');
}


export default importSettingsData;