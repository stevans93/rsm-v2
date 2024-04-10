const { Router } = require('express');
const upload = require('../midleweare/upload');
const compressImages = require('../midleweare/compressUserImage');
const router = new Router();

router.post('/register', upload.single('file'), compressImages, require('../controller/authController/register'));

router.post('/login', require('../controller/authController/login'));

module.exports = router;