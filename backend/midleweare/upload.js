const multer = require('multer');
const crypto = require('crypto');
const mime = require('mime');
const { MEDIA_LOCATION } = require('../config/config');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, MEDIA_LOCATION);
    },

    filename: function (req, file, cb) {
        const raw = crypto.pseudoRandomBytes(16);

        cb(null, raw.toString('hex') + '.' + mime.getExtension(file.mimetype));
    },
});

const fileFilter = function (req, file, cb) {
    const allowedMimes = ['image/jpeg', 'image/jpg', 'image/png'];

    if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Unsupported file type'));
    }
};

const upload = multer({
    storage,
    limits: {
        fileSize: 10485760,
    },
    fileFilter,
});

module.exports = upload;
