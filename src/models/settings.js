import mongoose from 'mongoose';
import validator from 'validator';


const settingsSchema = new mongoose.Schema({
    aboutBlurb: {
        type: String,
        required: false,
        trim: true
    },
    aboutImgUrl: {
        type: String,
        required: false,
        trim: true
    },
    aboutImgData: {
        type: Buffer,        
    },

    aboutTitle: {
        type: String,
        required: false,
        trim: true
    },

    contactEmail: {
        type: String,
        required: false,
        trim: true
    },

    contactPhone: {
        type: String,
        required: false,
        trim: true
    },

    facebookId: {
        type: String,
        required: false,
        trim: true
    },

    instagramId: {
        type: String,
        required: false,
        trim: true
    },

    twitterHandle: {
        type: String,
        required: false,
        trim: true
    },

    youTubeId: {
        type: String,
        required: false,
        trim: true
    },

    githubId: {
        type: String,
        required: false,
        trim: true
    },

    linkedinUsername: {
        type: String,
        required: false,
        trim: true
    },

    skypeId: {
        type: String,
        required: false,
        trim: true
    },    
    
    resumeUrl: {
        type: String,
        required: false,
        trim: true
    },
    siteTitle: {
        type: String,
        required: false,
        trim: true
    }
})

const Settings = mongoose.model('Settings', settingsSchema);

export default Settings;
