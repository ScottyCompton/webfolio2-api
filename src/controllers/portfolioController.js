import Portfolio from "../models/portfolio";
import sharp from 'sharp';


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
        const updatedPortfolio = await Portfolio.findById(_id);
        res.send(updatedPortfolio);

    } catch (error) {
        res.status(400).send();
    }
    
}

const deletePortfolio = async (req, res) => {
    const _id = req.params.id;

    try {
        const portfolioItem = await Portfolio.findById(_id);
        if(!portfolioItem) {
            return res.status(500).send();
        }
        await portfolioItem.remove();


        delete portfolioItem.previewImgData;

        res.send(portfolioItem);
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

        delete portfolio.createdAt;
        delete portfolio.updatedAt;
        delete portfolio.__v;

        res.send(portfolio);
    } catch (error) {
        res.status(500).send();
    }
        

}

const getPortfolio = async (req, res) => {

    try {
        const portfolio = await Portfolio.find({}).select(['-previewImgData','-auxImgs.auxImgData']);

        if(!portfolio) {
            return res.status(400).send('Apparenlty, there is nothing in your portfolio....')
        }
        
        res.send(portfolio);

    } catch (error) {
        res.status(400).send(error);
    }


}


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



const uploadPreviewImage = async (req, res) => {
    const portfolioId = req.params.id;

    try {
        const previewImgUrl = `portfolio/${portfolioId}/previewimg`;
        const portfolio = await Portfolio.findById(portfolioId);
        const buffer = await sharp(req.file.buffer).resize({width: 400, height: 600}).toBuffer();
        portfolio.previewImgData = buffer;
        portfolio.previewImgUrl = previewImgUrl;
        await portfolio.save();
        res.send({previewImgUrl,portfolioId});
    
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message)
    }
}


const deletePreviewImage = async (req, res) => {
    const {portfolioId} = req.params;

    try {
        const portfolio = await Portfolio.findById(portfolioId);
        portfolio.previewImgData = undefined;
        portfolio.previewImgUrl = undefined;
        res.send({portfolioId});        
    } catch (error) {
        res.status(500).send(error.message)
    }
}

const fetchPreviewImage = async (req, res) => {
    const portfolioId = req.params.id;

    try {
        const portfolio = await Portfolio.findById(portfolioId);    

        if(!portfolio) {
            throw new Error({error: 'This portfolio item could not be located'});
        }

        if(portfolio.previewImgData) {
            res.set('Content-type', 'image/jpg');
            res.send(portfolio.previewImgData);    
        }

    } catch (error) {
        res.status(500).send(error);

    }
}






const fetchAuxImage = async (req, res) => {
    const {id, auximgid} = req.params;

    try {
        const portfolio = await Portfolio.findById(id);    

        if(!portfolio) {
            throw new Error({error: 'This portfolio could not be located'});
        }

        if(portfolio.auxImgs && portfolio.auxImgs.length > 0) {
            
            const auxImg = portfolio.auxImgs.find(img => img._id.toString() === auximgid.trim())

            if(auxImg && auxImg.auxImgData) {
                res.set('Content-type', 'image/jpg');
                res.send(auxImg.auxImgData);    
            }
        }

    } catch (error) {
        res.status(500).send(error);

    }
}



const uploadAuxImage = async (req, res) => {
    const {id} = req.params;

    try {
        const portfolio = await Portfolio.findById(id);
        const buffer = await sharp(req.file.buffer).toBuffer();

        let auxImgs = portfolio.auxImgs;

        auxImgs.push({
            auxImgUrl: '',
            auxImgData: buffer
        })        
        portfolio.auxImgs = auxImgs;
        const auximgid = portfolio.auxImgs[portfolio.auxImgs.length-1]._id;
        portfolio.auxImgs[portfolio.auxImgs.length-1].auxImgUrl = `portfolio/${id}/auximg/${auximgid}`

        await portfolio.save();

        auxImgs = portfolio.auxImgs;

        for(let index = 0; index <= auxImgs.length - 1; index++) {
            auxImgs[index] = {
                _id: auxImgs[index].id,
                auxImgUrl: auxImgs[index].auxImgUrl
            }
        }

        res.send(auxImgs);

    } catch (error) {
        res.status(500).send(error);
    }
}




const deleteAuxImage = async (req, res) => {
    const {id, auximgid} = req.params;

    const portfolio = await Portfolio.findById(id);    

    try {
        if(!portfolio) {
            throw new Error({error: 'This portfolio could not be located'});
        }
    
        if(portfolio.auxImgs && portfolio.auxImgs.length > 0) {
            const auxImgs = portfolio.auxImgs.slice();
            const delIdx = auxImgs.findIndex(img => img._id === auximgid);
            auxImgs.splice(delIdx, 1)
            portfolio.auxImgs = auxImgs;
            await portfolio.save();

            auxImgs.forEach((img, index) => {
                delete auxImgs[index].auxImgData
            })


            res.send(auxImgs);
        }
    
    } catch (error) {
        res.status(500).send(error);
    }



}



export {
    updatePortfolio,
    deletePortfolio,
    createPortfolio,
    getPortfolioById,
    getPortfolio,
    togglePublished,
    moveUp,
    moveDown,
    fetchPreviewImage,
    uploadPreviewImage,
    deletePreviewImage,
    fetchAuxImage,
    uploadAuxImage,
    deleteAuxImage
}