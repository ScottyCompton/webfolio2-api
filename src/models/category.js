/*
const mongoose = require('mongoose')
const validator = require('validator')
*/

import mongoose from 'mongoose';
import validator from 'validator';


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
    },
    active: {
        type: Boolean,
        required: true,
        default: true
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

export default Category;