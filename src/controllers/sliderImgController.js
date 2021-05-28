
const SliderImg = require('../models/sliderImg');


const createSliderImg = async (req, res) => {
    const sliderImg = new SliderImg(req.body);

    let maxImg;
    try {
        maxImg = await SliderImg.find({}).sort({ sortOrder: -1 }).limit(1).then(imgs => imgs[0].sortOrder);
    
    } catch (err) {
        maxImg = -1;
    }


    try {
        sliderImg.sortOrder = maxImg + 1;
        await sliderImg.save();
        res.status(201).send(sliderImg);
    } catch (error) {
        res.status(400).send(error)
    }
}




const moveUp = async (req, res) => {
    const _id = req.params.id;
    const sliderImg = await SliderImg.findById(_id).exec();
    const imgAbove = await SliderImg.findOne({sortOrder: sliderImg.sortOrder - 1}).exec();

    try {
        imgAbove.sortOrder = imgAbove.sortOrder + 1;
        await imgAbove.save();

        sliderImg.sortOrder = sliderImg.sortOrder - 1;
        await sliderImg.save();
        res.status(201).send(sliderImg);
    } catch (error) {
        res.status(400).send(error.message)
    }

}




const moveDown = async (req, res) => {
    const _id = req.params.id;
    const sliderImg = await SliderImg.findById(_id).exec();
    const imgBelow = await SliderImg.findOne({sortOrder: sliderImg.sortOrder + 1}).exec();

    try {
        imgBelow.sortOrder = imgBelow.sortOrder - 1;
        await imgBelow.save();

        sliderImg.sortOrder = sliderImg.sortOrder + 1;
        await sliderImg.save();
        res.status(201).send(sliderImg);
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
        res.send(sliderImg);
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
        const sliderImgs = await SliderImg.find({}).sort({sortOrder: 'asc'});
        if(!sliderImgs) {
            return res.status(400).send();
        }
        res.send(sliderImgs);
    } catch (error) {
        res.status(500).send();
    }    
}



module.exports = {
    createSliderImg,
    updateSliderImg,
    deleteSliderImg,
    getSingleSliderImg,
    getAllSliderImgs,
    moveUp,
    moveDown
}