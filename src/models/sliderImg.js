const mongoose = require('mongoose')
const validator = require('validator')



const schemaSliderImg = new mongoose.Schema({
    originId: {
        type: String,
        required: true
    },
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
    sortOrder: {
        type: Number,
        required: false,
        default: 0,
    },
    src: {
        type: String,
        required: false
    }
})

const SliderImg = mongoose.model('SliderImg', schemaSliderImg);

module.exports = SliderImg;
