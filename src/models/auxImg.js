const mongoose = require('mongoose')


const auxImgSchema = new mongoose.Schema({
    title: {
        type: String,
        required: false
    },
    auxImgUrl: {
        type: String,
        required: true
    },
    auxImgData: {
        type: Buffer,
        required: false
    },
    aspectRatio: {
        type: Number,
        required: false,
        default: 0
    },   
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Portfolio'
    }

}, 
{timestamps: true})


const AuxImg = mongoose.model('AuxImg', auxImgSchema);

module.exports = AuxImg;