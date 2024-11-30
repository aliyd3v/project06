const multer = require("multer")
const { salting } = require('../helper/salt')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, salting(file.originalname) + '.' + file.mimetype.split('/')[1]);
    },
});

exports.upload = multer({ storage });