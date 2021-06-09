const mongoose = require('mongoose')
const validator = require('validator')



const schemaSliderImg = new mongoose.Schema({
    isForeground: {
        type: Boolean,
        required: false,
        default: false
    },
    orientation: {
        type: String,
        required: false,
        default: "portrait"
    },
    displayOrder: {
        type: Number
    },
    src: {
        type: String,
        required: false
    }
})

const SliderImg = mongoose.model('SliderImg', schemaSliderImg);

module.exports = SliderImg;
