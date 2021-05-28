

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
        const portfolio = await Portfolio.findByIdAndDelete(_id);
        if(!portfolio) {
            return res.status(500).send();
        }
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

const moveAuxImgUp = async (req, res) => {

}

const moveAuxImgDown = async (req, res) => {

}

const deleteAuxImg = async (req, res) => {

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
    moveAuxImgUp,
    moveAuxImgDown,
    deleteAuxImg,
    togglePublished
}