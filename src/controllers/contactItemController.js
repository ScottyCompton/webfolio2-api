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
    const _id = req.params.id;

    try {
        const {name, displayValue, linkUrl, fontAwesomeIcon, faPrefix} = req.body;
        const contactItem = await ContactItem.findOneAndUpdate({_id},{
            name,
            displayValue,
            linkUrl,
            fontAwesomeIcon,
            faPrefix
        })

        if(!contactItem) {
            return res.status(400).send();
        }
        res.status(201).send(contactItem)
    } catch (error) {
        res.status(400).send(error.message);
    }
}



const moveContactItem = async (req, res) => {
  
    const contactItems = req.body;

    try {
        if(contactItems && contactItems.length && contactItems.length > 0) {
            await ContactItem.deleteMany({});
            await ContactItem.insertMany(contactItems, (error, docs) => {
                if(error) {
                    res.status(400).send(error)
                } else {
                    res.send(docs);
                }
            })
        }

    } catch (error) {
        res.status(400).send(error.message);
    }

}



const deleteContactItem = async (req, res) => {

    try {
        const _id = req.params.id;
        const contactItem = await ContactItem.findByIdAndDelete(_id);

        if(!contactItem) { 
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
    deleteContactItem,
    moveContactItem
}