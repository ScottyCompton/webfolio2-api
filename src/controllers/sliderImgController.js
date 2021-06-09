
const SliderImg = require('../models/sliderImg');


const createSliderImg = async (req, res) => {
    const sliderImg = new SliderImg(req.body);

    let maxImg;
    try {
        maxImg = await SliderImg.find({}).sort({ displayOrder: -1 }).limit(1).then(imgs => imgs[0].displayOrder);
    
    } catch (err) {
        maxImg = -1;
    }


    try {
        sliderImg.displayOrder = maxImg + 1;
        await sliderImg.save();
        res.status(201).send(sliderImg);
    } catch (error) {
        res.status(400).send(error)
    }
}




const moveUp = async (req, res) => {
    const _id = req.params.id;
    const sliderImg = await SliderImg.findById(_id).exec();
    const imgAbove = await SliderImg.findOne({displayOrder: sliderImg.displayOrder - 1}).exec();

    try {
        imgAbove.displayOrder = imgAbove.displayOrder + 1;
        await imgAbove.save();

        sliderImg.displayOrder = sliderImg.displayOrder - 1;
        await sliderImg.save();
        const sliderImgs = await SliderImg.find({});
        res.status(201).send(sliderImgs);
    } catch (error) {
        res.status(400).send(error.message)
    }

}




const moveDown = async (req, res) => {
    const _id = req.params.id;
    const sliderImg = await SliderImg.findById(_id).exec();
    const imgBelow = await SliderImg.findOne({displayOrder: sliderImg.displayOrder + 1}).exec();

    try {
        imgBelow.displayOrder = imgBelow.displayOrder - 1;
        await imgBelow.save();

        sliderImg.displayOrder = sliderImg.displayOrder + 1;
        await sliderImg.save();
        const sliderImgs = await SliderImg.find({});
        res.status(201).send(sliderImgs);
    } catch (error) {
        res.status(400).send(error.message)
    }

}





const updateSliderImg = async (req, res) => {
    const _id = req.params.id;
    const sliderImg = await SliderImg.findById(_id);
    await sliderImg.save();

    if(!sliderImg) {
        return res.status(400).send();
    }

    res.send(sliderImg);

}

const deleteSliderImg = async (req, res) => {
    const _id = req.params.id;

    try {
        const sliderImg = await SliderImg.findByIdAndDelete(_id)
        if(!sliderImg) {
            return res.status(404).send();
        }
        
        const sliderImgs = await SliderImg.find({})
        res.send(sliderImgs);

    } catch (error) {
        res.status(500).send();
    }    
}

const getSingleSliderImg = async (req, res) => {
    const _id = req.params.id;

    try {
        const sliderImg = await SliderImg.findById(_id);
        if(!sliderImg) {
            return res.status(400).send();
        }
        res.send(sliderImg);
    } catch (error) {
        res.status(500).send();
    }
}

const getAllSliderImgs = async (req, res) => {
    try {
        const sliderImgs = await SliderImg.find({});
        if(!sliderImgs) {
            return res.status(400).send();
        }
        res.send(sliderImgs);
    } catch (error) {
        res.status(500).send();
    }    
}


const setAsForegroundImg = async (req, res) => {
    const {id} = req.params;
    
    try {

        const thisSliderImg = await SliderImg.findById(id);
        const orientation = thisSliderImg.orientation;           // landscape or portrait
        const options = { multi: true, upsert: true };

        const conditions = {orientation};
        const update = {
            $set: {
                isForeground: false
            }
        }
        await SliderImg.updateMany(conditions, update, options);
        thisSliderImg.isForeground = true;
        await thisSliderImg.save();

        const retVals = await SliderImg.find({});

        res.send(retVals);

    } catch (error) {
        res.status(500).send(error);
    }
}


module.exports = {
    createSliderImg,
    updateSliderImg,
    deleteSliderImg,
    getSingleSliderImg,
    getAllSliderImgs,
    moveUp,
    moveDown,
    setAsForegroundImg
}