const UserModel = require('../../models/userModel');

const editUser = async (req, res) => {
  const { _id } = req.locals
  const newUser = req.body;

  const image = req?.file
  userImage = image ? { profileImage: image.filename } : null
  try {
    const user = await UserModel.findByIdAndUpdate(_id, { ...newUser, ...userImage }, { new: true })
    const { password, ...updatedUser } = user.toJSON()
    res.status(200).json(updatedUser)
  } catch (error) {
    console.log(error)
  }

}

module.exports = editUser;