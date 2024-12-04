const multer = require("multer")
const { salting } = require('../helper/salt')
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, /*salting(*/Date.now()/*)*/ + '-' + /*path.extname(*/file.originalname/*)*/)
    },
});

exports.upload = multer({
    storage,
    limits: { fileSize: 8 * 1024 * 1024 }
});