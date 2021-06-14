/*
const mongoose = require('mongoose')
const validator = require('validator')
*/

import mongoose from 'mongoose';
import validator from 'validator';



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
    sliderImgUrl: {
        type: String,
        required: false
    },
    sliderImgData: {
        type: Buffer
    }
})

const SliderImg = mongoose.model('SliderImg', schemaSliderImg);

export default SliderImg;
