import '../db/mongoose';
import SliderImg  from '../models/sliderImg.js';


const importSliderData = async (sliderData) => {
    console.log('\n\nExecuting legacy slider data import...\n===============================================');

    await SliderImg.deleteMany({});

    sliderData.forEach(async (img) => {
        sliderImg = new SliderImg({
                ...img, 
                displayOrder: img.sortOrder,
                sliderImgUrl: img.src
            });
        await sliderImg.save();
    })

    console.log(`Imported ${sliderData.length} images to slider data`);

}


export default importSliderData;