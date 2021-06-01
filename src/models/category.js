const mongoose = require('mongoose')
const validator = require('validator')
//const bcrypt = require('bcryptjs')
//const jwt = require('jsonwebtoken');


const categorySchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
        trim: true
    },
    displayOrder: {
        type: Number,
        required: false,
        default: -1
    }
}, {timestamps: true});



// categorySchema.virtual('portCats', {
//     ref: 'PortCat',
//     localField: '_id',
//     foreignField: 'categoryId'
// });



// // delete portfolio images and portCats when the portfolio item is removed 
// categorySchema.pre('remove', async function (next) {
//     const cat = this;
//     await PortCat.deleteMany({categoryId: cat._id})

//     next();
// });



const Category = mongoose.model('Category', categorySchema);

module.exports = Category;