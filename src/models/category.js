
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


const Category = mongoose.model('Category', categorySchema);

export default Category;