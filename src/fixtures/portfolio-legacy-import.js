require('../db/mongoose');
const Portfolio = require('../models/portfolio.js');
const Category = require('../models/category.js');




const importLegacyData = async (req, res) => {
    console.clear();
    console.log('Executing legacy data import');
    const fs = require('fs');
    let rawdata = await fs.readFileSync('webfolio.json');
    let jsonData = await JSON.parse(rawdata);
    let portfolioData = await jsonData.portfolio;


    const categories = await Category.find({})






   
    
    try {
        for(key in portfolioData) {
            let item = portfolioData[key]

     
            let csoArray = item.cso;

            if(csoArray.length > 0) {
                console.log(`\n\n\nCurrent Categories for Portfolio "${item.projectTitle}":\n ----------------------------------`)
                csoArray.forEach((elem, index) => {
                    console.log(elem,'\n\n');
                    let currCatId = elem.catId;
                    let cat = categories.find((item) => {
                        return elem.catId.toString() === currCatId.toString();
                    })
                    console.log('Matching Category Found: ', cat);
                    if(cat) {
                        console.log('category._id = ' + cat._id);
                    }
                    
                    csoArray[index].catId = cat._id;
                }) 
            }
        
            console.log('UPDATED CSO ARRAY: ', csoArray);
        
            if(1 === 1) {
                portItem = new Portfolio({
                    githubUrl: item.githubUrl,
                    longDesc: item.longDesc,
                    projectTitle: item.projectTitle,
                    projectUrl: item.projectUrl,
                    published: item.published,
                    shortDesc: item.shortDesc,
                    techSpecs: item.techSpecs,
                    previewImg: item.previewImg,
                    auxImgs: item.auxImgs,
                    auxImgAspectRatio: item.auxImgAspectRatio,
                    cso: csoArray
                })       
                await portItem.save(); 
            }
           
        }
        
    } catch (error) {
        console.log(error);
    }
    
    return console.log('Task Completed, all data successfully imported!')


}


importLegacyData();
