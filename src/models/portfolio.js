import mongoose from 'mongoose';
import validator from 'validator';


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
    previewImgUrl: {
        type: String,
        required: false,
        trim: true
    },
    previewImgData: {
        type: Buffer,
        required: false
    },
    cso: [
        {
            category_id: {
                type: String                
            },
            displayOrder: {
                type: Number
            }
        }
    ],
    auxImgs: [
        {
            auxImgUrl: {
                type: String,
            },
            auxImgData: {
                type: Buffer
            }
        }
    ],
    auxImgAspectRatio: {
        type: Number,
        required: false
    }
    
}, {timestamps: true});




const Portfolio = mongoose.model('Portfolio', portfolioSchema);

export default Portfolio;