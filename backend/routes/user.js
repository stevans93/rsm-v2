const { Router } = require('express');
const verifyToken = require('../midleweare/verifyToken');
const upload = require('../midleweare/upload');
const compressImages = require('../midleweare/compressUserImage.js');
const router = new Router();

router.get('/all', require('../controller/userController/getAllUsers'));

router.put('/changePassword', verifyToken, require('../controller/userController/changePassword.js'))

router.post('/', verifyToken, upload.single('file'), compressImages, require('../controller/userController/editUser'));

router.post('/upload-image', upload.single('file'), require('../controller/userController/uploadImage'));

router.delete('/:id', require('../controller/userController/deleteUser'));

module.exports = router;