

const Portfolio = require("../models/portfolio");



const updatePortfolio = async (req, res) => {
    const _id = req.params.id;

    try {

        const portData = req.body;
        delete portData.published;
        delete portData.auxImgs;

        const portfolio = await Portfolio.findOneAndUpdate({_id}, portData);
        if(!portfolio) {
            return res.status(400).send();
        }

        res.send(portfolio);

    } catch (error) {
        res.status(400).send();
    }
    
}

const deletePortfolio = async (req, res) => {
    const _id = req.params.id;

    try {
        const portfolio = await Portfolio.findById(_id);
        if(!portfolio) {
            return res.status(500).send();
        }
        await portfolio.remove();
        res.send(portfolio);
    } catch (error) {
        res.status(400).send();
    }

}

const createPortfolio = async (req, res) => {
    const portData = req.body;

    //delete portData.auxImgs;

    const portfolio = new Portfolio(portData);
    try {
        await portfolio.save();    
        res.status(200).send(portfolio);
    } catch (error) {
        res.status(500).send(error);
    }   
}

const getPortfolioById = async (req, res) => {
    const _id = req.params.id;

    try {
        const portfolio = await Portfolio.findById(_id);

        if(!portfolio) {
            return res.status(404).send();
        }
        res.send(portfolio);
    } catch (error) {
        res.status(500).send();
    }
        

}

const getPortfolio = async (req, res) => {

    try {
        const portfolio = await Portfolio.find({});

        if(!portfolio) {
            return res.status(400).send('Apparenlty, there is nothing in your portfolio....')
        }
        res.send(portfolio);

    } catch (error) {
        res.status(400).send(error);
    }


}

// const updateAuxImgs = async (req, res) => {
//     const _id = req.params.id;

//     try {
//         const portfolio = await Portfolio.findById(_id);
//         if(!portfolio) {
//             res.status(400).send('couldn\'t find this portfolio item for some reason...')
//         }
//         portfolio.auxImgs = req.body.auxImgs;
//         await portfolio.save();
//         res.send(req.body)
//     } catch (error) {
//         res.status(400).send(error);
//     }
// }



const moveAndSave = async (portfolioId, categoryId, direction = 1) => {

    const portfolioItem = await Portfolio.findById(portfolioId);
    const portfolioItem_cso = portfolioItem.cso;
    const portfolioItem_catIdx = portfolioItem_cso.findIndex(item => item.category_id === categoryId);
    const portfolioItem_displayOrder =  portfolioItem_cso[portfolioItem_catIdx].displayOrder
    portfolioItem.cso[portfolioItem_catIdx].displayOrder =  portfolioItem_displayOrder + direction;

    await portfolioItem.save();

}


const moveUp = async (req, res) => {
    const {categoryId, portfolioId, adjacentId} = req.body

    try {
        console.clear();
        await moveAndSave(portfolioId, categoryId, -1)
        await moveAndSave(adjacentId, categoryId, 1)

       const portfolio = await Portfolio.find({});
        
        res.send(portfolio);
        
    } catch (error) {
        res.status(400).send({error: error.message});
    } 
    

}




const moveDown = async (req, res) => {
    const {categoryId, portfolioId, adjacentId} = req.body

    try {
        console.clear();
        await moveAndSave(portfolioId, categoryId, 1)
        await moveAndSave(adjacentId, categoryId, -1)

       const portfolio = await Portfolio.find({});
        
        res.send(portfolio);
        
    } catch (error) {
        res.status(400).send({error: error.message});
    } 
    

}


const togglePublished = async (req, res) => {
    const _id = req.params.id;


    try {
        const portfolio = await Portfolio.findById(_id);

        if(!portfolio) {
            return res.status(400).send();
        }

        portfolio.published = !portfolio.published;
        await portfolio.save();

        res.send(portfolio);

    } catch (error) {
        res.status(500).send(error);

    }
}


module.exports = {
    updatePortfolio,
    deletePortfolio,
    createPortfolio,
    getPortfolioById,
    getPortfolio,
    togglePublished,
    moveUp,
    moveDown
}