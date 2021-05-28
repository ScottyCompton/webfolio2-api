const mongoose = require('mongoose')
const validator = require('validator')



const SliderImg = new mongoose.Schema({
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
        type: Boolean,
        required: false,
        default: 0,
    },
    src: {
        type: String,
        required: false
    }
})

const SliderImg = mongoose.model('SliderImg', SliderImgSchema);

module.exports = SliderImg;
