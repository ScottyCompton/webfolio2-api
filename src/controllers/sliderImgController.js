import SliderImg from '../models/sliderImg';
import sharp from 'sharp';


const uploadSliderImg = async (req, res) => {

    const orientation = req.params.orientation;


    let maxImg = -1;
    try {
        maxImg = await SliderImg.find({orientation}).sort({ displayOrder: -1 }).limit(1).then(imgs => imgs[0].displayOrder);
    } catch (error) {
        console.log(error)
    }



    try {
        const buffer = await sharp(req.file.buffer).toBuffer();

        const sliderImg = await new SliderImg({
            orientation,
            isForeground: false,
            displayOrder: maxImg + 1,
            sliderImgUrl: '',
            sliderImgData: buffer
        });
        
        await sliderImg.save();    
        const sliderImgUrl = `sliderimgs/${sliderImg._id}`;
        sliderImg.sliderImgUrl = sliderImgUrl
        await sliderImg.save();

        const sliderImgs = await SliderImg.find({});

        res.status(201).send(sliderImgs);
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



const deleteSliderImg = async (req, res) => {
    const _id = req.params.id;

    try {
        const sliderImg = await SliderImg.findByIdAndDelete(_id);

        if(!sliderImg) {
            return res.status(404).send();
        }
        
        const retval = await SliderImg.find({});
        retval.forEach(async (img, index) => {
            if(img.displayOrder >= sliderImg.displayOrder) {
                retval[index].displayOrder = retval[index].displayOrder - 1;
                await retval[index].save();
                delete retval[index].sliderImgData;
            }
        })

        res.send(retval);

    } catch (error) {
        res.status(500).send();
    }    
}




const fetchSliderImg = async (req, res) => {
    const {id} = req.params;

    try {
        const sliderImg = await SliderImg.findById(id)

        if(sliderImg && sliderImg.sliderImgData) {
            res.set('Content-type', 'image/jpg');
            res.send(sliderImg.sliderImgData);    
        }

    } catch (error) {
        res.status(500).send(error);

    }
}



const getSingleSliderImg = async (req, res) => {
    const _id = req.params.id;

    try {
        const sliderImg = await SliderImg.findById(_id).select(['-sliderImgData']);
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
        const sliderImgs = await SliderImg.find({}).select(['-sliderImgData']);
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


export {
    uploadSliderImg,
    deleteSliderImg,
    fetchSliderImg,
    getAllSliderImgs,
    moveUp,
    moveDown,
    setAsForegroundImg
}