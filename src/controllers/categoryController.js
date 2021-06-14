//const Category = require('../models/category');
import Category from '../models/category';

const createCategory = async (req, res) =>{
    const cat = new Category(req.body);
    let maxCat;
    try {
       maxCat = await Category.find({}).sort({ displayOrder: -1 }).limit(1).then(cats => cats[0].displayOrder);
    
    } catch (err) {
       maxCat = -1;
    }


    try {

          cat.displayOrder = maxCat + 1

        await cat.save();
        res.status(201).send(cat);
    } catch (error) {
        console.log(error);
    }
}


const getCategoryList = async (req, res) => {

    try {
        const tasks = await Category.find({active: true}).sort({displayOrder: 'asc'});
        res.send(tasks);
    } catch(error) {
        res.status(400).send(error.message);
    }
}


const updateCategory = async (req, res) => {
    
    try {
        const _id = req.params.id;
        const cat = await Category.findOneAndUpdate({_id},{category: req.body.category})

        if(!cat) {
            return res.status(400).send();
        }
        res.status(201).send(cat)
    } catch (error) {
        res.status(400).send(error.message);
    }
}


const moveDown = async (req, res) => {
    const _id = req.params.id;
    const cat = await Category.findById(_id).exec();
    const catAbove = await Category.findOne({displayOrder: cat.displayOrder + 1}).exec();

    try {
        catAbove.displayOrder = catAbove.displayOrder - 1;
        await catAbove.save();

        cat.displayOrder = cat.displayOrder + 1;
        await cat.save();
        res.status(201).send(cat);
    } catch (error) {
        res.status(400).send(error.message)
    }

}





const moveUp = async (req, res) => {
    const _id = req.params.id;
    const cat = await Category.findById(_id).exec();
    const catAbove = await Category.findOne({displayOrder: cat.displayOrder - 1}).exec();

    try {
        catAbove.displayOrder = catAbove.displayOrder + 1;
        await catAbove.save();

        cat.displayOrder = cat.displayOrder - 1;
        await cat.save();
        res.status(201).send(cat);
    } catch (error) {
        res.status(400).send(error.message)
    }

}


const updateCategoryDisplayOrder = async (req, res) => {
    try {
        const _id = req.params.id;
        const cat = await Category.findOneAndUpdate({_id}, {displayOrder: req.body.displayOrder})
        if(!cat) {
            return res.status(400).send();
        }
        res.status(201).send(cat);
    } catch(error) {
        res.status(400).send();
    }
}

const deleteCategory = async (req, res) => {

    try {
        const _id = req.params.id;
        const cat = await Category.findByIdAndDelete(_id);

        if(!cat) { 
            res.status(400).send();
        }
        res.status(201).send(cat);

    } catch (error) {
        res.status(400).send(error.message)
    }
}



const getCategoryById = async (req, res) => {
    try {
        const _id = req.params.id;
        const cat = await Category.findById(_id).exec();


        if(!cat) {
            return res.status(400).send();
        }

        res.status(201).send(cat);

    } catch(error) {
        res.status(400).send(error.message);
    }
}


export {
    createCategory,
    getCategoryList,
    updateCategory,
    deleteCategory,
    getCategoryById,
    updateCategoryDisplayOrder,
    moveDown,
    moveUp
}