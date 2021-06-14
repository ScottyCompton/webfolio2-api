import PortfolioData from './import-legacy-portfolio-data';
import SliderData from './import-legacy-slider-data';
import SettingsData from './import-legacy-settings-data';

const fs = require('fs');

let portfolioData;
let categoryData

const init = async () => {

    let rawdata = await fs.readFileSync('webfolio.json');
    let jsonData = JSON.parse(rawdata);
    portfolioData = jsonData.portfolio;
    categoryData = jsonData.categories; 
    settingsData = jsonData.settings
    sliderData = settingsData.sliderImgs;   
    
}


const executeImport = async() => {
    console.clear();
    await init();
    await importPortfolioData(portfolioData, categoryData);
    await importSettingsData(settingsData);
    await importSliderData(sliderData);
    console.log('\n\n**********  All done!  ***************');
    process.exit();
}




executeImport();