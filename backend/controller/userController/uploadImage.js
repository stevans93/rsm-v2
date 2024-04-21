const UserModel = require('../../models/userModel');

const uploadImage = (req, res) => {
  res.status(200).json('uploaded')
}

module.exports = uploadImage;