const UserModel = require('../../models/userModel');
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { httpStatus } = require("../../config/constants");

const register = async (req, res) => {
    const { email, password } = req.body;
    const reqBody = req.body;
    const file = req.file;


    console.log("Password:", password);
    console.log("Body:", reqBody);
    console.log("files", file)

    let isExist = await UserModel.findOne({ email });

    if (isExist > 0) {
        res.status(httpStatus.EXIST.status).send(httpStatus.EXIST.send);
    } else {
        bcrypt.hash(password, saltRounds, (error, hash) => {
            if (error) {
                console.error(error);
            }

            let newUser = new UserModel({ ...reqBody, profileImage: file.filename, password: hash });

            newUser.save()
                .then((user) => {
                    res.status(200).json(user);
                })
                .catch((error) => {
                    res.status(httpStatus.SERVICE_ERROR.status).send(error.message)
                })
        });
    }
}

module.exports = register;