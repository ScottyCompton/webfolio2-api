/*
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const dotenv = require('dotenv');
*/

import jwt from 'jsonwebtoken';
import User from '../models/user';
import dotenv from 'dotenv';


dotenv.config();
const jwtTokenSecret = process.env.JWT_SECRET; //'thisIsNotthewayTodoThIngz'


const auth = async (req, res, next) => {

    try {
        const token = req.header('Authorization').replace('Bearer ','');

        const decoded = jwt.verify(token, jwtTokenSecret)

        const user = await User.findOne({_id: decoded._id, 'tokens.token': token});
        
        if(!user) {
            throw new Error()
        }

        req.user = user;
        req.token = token;

        next();


    } catch (error) {
        res.status(400).send({error: 'Please authenticate'});
    }

}

export default auth;