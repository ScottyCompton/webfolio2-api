import Portfolio from "../models/portfolio";
import Category from "../models/category";
import Settings from "../models/settings";
import SliderImg from "../models/sliderImg";
import ContactItem from '../models/contactItem';

const getAllAppData = async (req, res) => {

    try {
        const portfolio = await Portfolio.find({published: true}).select(['-previewImgData', '-auxImgs.auxImgData']);
        const categories = await Category.find({active: true});
        const settings = await Settings.findOne({}).select(['-aboutImgData']);
        const sliderImgs = await SliderImg.find({}).select(['-sliderImgData']);
        const contactItems = await ContactItem.find({});
    
        const retval = {
            portfolio,
            categories,
            settings,
            sliderImgs,
            contactItems
        }
    
        res.send(retval);
    
    } catch (error) {
        res.status(400).send(error);
    }
}

export {getAllAppData};
