const UserModel = require("../../models/userModel");

const getAllUsers = async (req, res) => {
  const id = req.params.id || null
  try {
    await UserModel.findByIdAndDelete(id)
    return res.status(200).json('deleted')
  } catch (error) {
    return res.status(400).json(error.message)
  }
}

module.exports = getAllUsers