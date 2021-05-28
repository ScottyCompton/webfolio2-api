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
    },
    catId: {
        type: String,
        required: false,
        default: "0"
    }

});


const Category = mongoose.model('Category', categorySchema);

module.exports = Category;