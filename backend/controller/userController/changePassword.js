const UserModel = require('../../models/userModel');
const saltRounds = 10;
const bcrypt = require("bcrypt");

const changePassword = async (req, res) => {
  const { _id } = req.locals
  const { oldPassword, newPassword } = req.body
  try {
    const user = await UserModel.findById(_id)
    const checkPassword = await bcrypt.compare(oldPassword, user.password)

    user.password = await bcrypt.hash(newPassword, saltRounds)
    user.save()
    res.status(200).json('Lozinka promenjena')
  } catch (error) {
    console.log(error)
  }

}

module.exports = changePassword;