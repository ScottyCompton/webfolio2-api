const mongoose = require('mongoose')
const validator = require('validator')
//const bcrypt = require('bcryptjs')



const portfolioSchema = new mongoose.Schema({
    githubUrl: {
        type: String,
        required:false,
        trim: true
    },
    longDesc: {
        type: String,
        required: false,
        trim: true
    },
    projectTitle: {
        type: String,
        required: true,
        trim: true
    },
    projectUrl: {
        type: String,
        required: false,
        trim: true
    },
    published: {
        type: Boolean,
        required: false,
        default: false
    },
    shortDesc: {
        type: String,
        required: false,
        trim: true
    },
    techSpecs: {
        type: String,
        required: false,
        trim: true
    },
    previewImg: {
        type: String,
        required: false,
        trim: true
    },
    auxImgs:[String],
    auxImgAspectRatio: {
        type: String,
        required: false
    },
    cso: [
        {
            catId: {
                type: String,
                required: true,
            },
            sortOrder: {
                type: Number,
                required: true,
                default: 0
            }
        }
    ]
    
});

const Portfolio = mongoose.model('Portfolio', portfolioSchema);

module.exports = Portfolio;