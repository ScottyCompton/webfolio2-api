
import mongoose from 'mongoose';
import validator from 'validator';


const contactItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    displayValue: {
        type: String,
        required: true,
        trim: true
    },
    linkUrl: {
        type: String,
        required: false,
    },
    fontAwesomeIcon: {
        type: String,
        required: false,
    },
    faPrefix: {
        type: String,
        required: true,
        default: 'fab'    // solid or brands
    }

}, {timestamps: true});


const ContactItem = mongoose.model('ContactItem', contactItemSchema);

export default ContactItem;