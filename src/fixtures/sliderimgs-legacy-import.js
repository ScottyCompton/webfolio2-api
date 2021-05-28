require('../db/mongoose');
const SliderImg = require('../models/sliderImg.js');


const importLegacyData = async (req, res) => {
    console.clear();
    console.log('Executing legacy data import');
    const fs = require('fs');
    let rawdata = await fs.readFileSync('webfolio.json');
    let jsonData = await JSON.parse(rawdata);
    let sliderData = await jsonData.settings.sliderImgs;

    sliderData.forEach(async (img) => {
        sliderImg = new SliderImg({...img, originId: img.id});
        await sliderImg.save();
        console.log ('SAVED SLIDER IMAGE DATA: ---------------\n', img )
    })


}


importLegacyData();