import Portfolio from "../models/portfolio";
import Category from "../models/category";
import Settings from "../models/settings";
import SliderImg from "../models/sliderImg";


const getAllAppData = async (req, res) => {

    try {
        const portfolio = await Portfolio.find({}).select(['-previewImgData', '-auxImgs.auxImgData']);
        const categories = await Category.find({active: true});
        const settings = await Settings.findOne({}).select(['-aboutImgData']);
        const sliderImgs = await SliderImg.find({}).select(['-sliderImgData']);
    
        const retval = {
            portfolio,
            categories,
            settings,
            sliderImgs
        }
    
        res.send(retval);
    
    } catch (error) {
        res.status(400).send(error);
    }
}

export {getAllAppData};
