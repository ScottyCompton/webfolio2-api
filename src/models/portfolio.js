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
    ]
    
}, {timestamps: true});


portfolioSchema.virtual('auximgs', {
    ref: 'AuxImg',
    localField: '_id',
    foreignField: 'owner'
});


// portfolioSchema.virtual('portCats', {
//     ref: 'PortCat',
//     localField: '_id',
//     foreignField: 'portfolioId'
// });



// // delete portfolio images and portCats when the portfolio item is removed 
// portfolioSchema.pre('remove', async function (next) {
//     const portfolio = this;
//     await AuxImg.deleteMany({owner: portfolio._id});
//     await PortCat.deleteMany({portfolioId: portfolio._id})

//     next();
// });



const Portfolio = mongoose.model('Portfolio', portfolioSchema);

module.exports = Portfolio;