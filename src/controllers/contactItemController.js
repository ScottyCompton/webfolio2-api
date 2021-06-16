import ContactItem from '../models/contactItem';

const createContactItem = async (req, res) =>{
    const contactItem = new ContactItem(req.body);

    try {
        await contactItem.save();
        res.status(201).send(contactItem);
    } catch (error) {
        console.log(error);
    }
}


const getContactItemList = async (req, res) => {

    try {
        const contactItems = await ContactItem.find({});
        res.send(contactItems);
    } catch(error) {
        res.status(400).send(error.message);
    }
}


const updateContactItem = async (req, res) => {    
    try {
        const {name, displayValue, linkUrl, fontAwesomeIcon, _id, faPrefix} = req.body;
        const contactItem = await ContactItem.findOneAndUpdate({_id},{
            name,
            displayValue,
            linkUrl,
            fontAwesomeIcon,
            iconSource
        })

        if(contactItem) {
            return res.status(400).send();
        }
        res.status(201).send(contactItem)
    } catch (error) {
        res.status(400).send(error.message);
    }
}



const deleteContactItem = async (req, res) => {

    try {
        const _id = req.params.id;
        const contactItem = await Category.findByIdAndDelete(_id);

        if(!cat) { 
            res.status(400).send();
        }
        res.status(201).send(contactItem);

    } catch (error) {
        res.status(400).send(error.message)
    }
}


export {
    createContactItem,
    getContactItemList,
    updateContactItem,
    deleteContactItem
}