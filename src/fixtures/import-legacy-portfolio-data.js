import '../db/mongoose';
import Portfolio from '../models/portfolio.js';
import Category from '../models/category.js';

let categoryData;   // from the JSON
let categories;

const importPortfolioData = async (req, res, portfolioData, catData) => {
    let portfolioId;
    categoryData = catData;
    strOut = '\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n' + 
    '=================================================\n' +
    '=================================================\n' +
    '======= NOW COMMENCING LEGACY DATA IMPORT =======\n' +
    '=================================================\n' +
    '=================================================\n';

    
    console.clear();
    console.log(strOut);
    
    await Category.deleteMany({});
    await Portfolio.deleteMany({});
    await insertCategories();  // we're gonna need this in a minute...
    
    try {
 

        for(key in portfolioData) {
            let item = portfolioData[key]    

            portfolioId = await savePortfolioItem(item)

            await transformCSO(portfolioId, item)

        }
        
    } catch (error) {
        console.log(error);
    }

}


const savePortfolioItem =  async (item) => {

        const auxImgs = await getAuxImgs(item);

        const portItem = new Portfolio({
        githubUrl: item.githubUrl,
        longDesc: item.longDesc,
        projectTitle: item.projectTitle,
        projectUrl: item.projectUrl,
        published: item.published,
        shortDesc: item.shortDesc,
        auxImgAspectRatio: item.auxImgAspectRatio ? parseFloat(item.auxImgAspectRatio) : null,
        techSpecs: item.techSpecs,
        auxImgs: auxImgs,
        previewImgUrl: item.previewImg});
        console.log(`Inserting Portfolio Item - ${item.projectTitle}`);

        const portfolio = await portItem.save(); 
        return portfolio._id;
}



const insertCategories = async () => {
    console.log('\n\nInserting legacy Categories:\n===============================================');

    categoryData.forEach(async (item) => {
        console.log(`Insertinig new category - ${item.category}`);
        catItem = new Category({
            category: item.category,
            displayOrder: item.displayOrder
        })
        await catItem.save()        
    })
}


const getAuxImgs = async (item) => {
    const auxImgArray = [];
    if(item.auxImgs && item.auxImgs.length > 0) {
        
        for(let i = 0; i <= item.auxImgs.length - 1; i++) {
            auxImgArray.push({
                auxImgUrl: item.auxImgs[i]
            })
        }
    }
    return auxImgArray;
}



const transformCSO = async (portfolioId, item) => {
    console.log('transforming CSO Array for ' + item.projectTitle)

    const csoArray = item.cso;

    let updatedCsoArray = [];
    let catId;
    let sortOrder;

    for(let i = 0; i <= csoArray.length-1; i++) {
        catId = csoArray[i].catId;
        displayOrder = csoArray[i].sortOrder.toString() === '-1' ? i : csoArray[i].sortOrder;
        let category = await Category.findOne({displayOrder: parseInt(catId)});
        let category_id = category._id;

        updatedCsoArray.push({
            category_id,
            displayOrder
        })
    }

    await Portfolio.findByIdAndUpdate(portfolioId, {cso: updatedCsoArray});

}




export default importPortfolioData;