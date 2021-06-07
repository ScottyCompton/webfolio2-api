
const multer = require('multer');
const upload = multer(
    {
        limits: {
            fileSize: 3000000
        },
        fileFilter(req, file, cb) {
            if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
                return cb(new Error('Please upload a valid image file'))
            }
            cb(undefined, true);
        }
    })

const uploadError = (error, req, res, next) => {
    res.status(400).send({error: error.message});
};


module.exports = {
    upload,
    uploadError
}