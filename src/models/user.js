import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';



dotenv.config();

const jwtTokenSecret = process.env.JWT_SECRET; //'thisIsNotthewayTodoThIngz'


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
})


userSchema.methods.toJSON = function() {
    const user = this;
    const userObj = user.toObject();

     delete userObj.password;
     delete userObj.tokens;

    return userObj
}


userSchema.methods.generateAuthToken = async function() {
    const user = this;

    const token = jwt.sign({_id: user.id.toString()}, jwtTokenSecret);

    user.tokens = user.tokens.concat({token});
    await user.save();

    return token;
}



userSchema.statics.findByCredentials = async (email, password) => {

    const user = await User.findOne({email});

    if(!user) {
        return {
            status: "User Not Found"
        }
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) {
        return {
            status: "Password did  not match"
        }
    }

    return user;

}



userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

const User = mongoose.model('User', userSchema)

export default User;