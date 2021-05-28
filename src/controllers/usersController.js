const User = require('../models/user');


const createUser = async (req,res) => {
    const user = new User(req.body)

    try {
        await user.save();
        const token = user.generateAuthToken();

        res.status(201).send({user, token});
    } catch(error) {
        res.status(400).send(error.message);
    }
}




const getAuthenticatedUser = async (req,res) => {
    res.send(req.user);
}



const getUserList = async (req,res) => {

    try {
        users = await User.find();
        res.send(users);    
    } catch(error) {
        res.send(error);
    }
}


const getUserById = async (req,res) => {
    const _id = req.params.id;

    try {
        const user = await User.findById(_id).exec();
        if(!user) {
            return res.status(400).send();
        }
        res.send(user);
    } catch (error) {
        res.status(500).send(error)
    }
}


const updateUser = async (req, res) => {
    const _id = req.params.id;
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if(!isValidOperation) {
        return res.status(400).send('Invalid updates');
    }

    try {
        //const user = await User.findByIdAndUpdate(_id, req.body, {new: true, runValidators: true});
        const user = await User.findById(_id);

        updates.forEach((update) => user[update] = req.body[update]);
        await user.save();


        if(!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch(error) {
        res.status(400).send(error);
    }

}


const deleteUser = async (req, res) => {
    const _id = req.params.id;
    try {
        const user = await User.findByIdAndDelete(_id)
        if(!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (error) {
        res.status(500).send();
    }
}



const authenticateUser = async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken()
        res.send({user, token});
    } catch (error) {
        res.status(400).send();
    }

}


const logoutUser = async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        })
        await req.user.save();
        res.send();
    } catch (error) {
        res.status(500).send();
    }
}



const logoutAllSessions = async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send();

    } catch (error) {
        res.status(500).send();
    }
}



module.exports = {
    getUserList,
    getAuthenticatedUser,
    logoutAllSessions, 
    logoutUser,
    createUser,
    getUserById,
    updateUser,
    deleteUser,
    authenticateUser
}