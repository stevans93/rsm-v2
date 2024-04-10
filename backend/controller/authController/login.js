const { httpStatus } = require("../../config/constants");
const UserModel = require("../../models/userModel");
const bcrypt = require('bcrypt');
const createToken = require("../../utils/jwt");

const login = (req, res) => {
    const {email, password} = req.body;

    UserModel.findOne({email}, null, {lean: true})
        .then((user) => {
            if(user) {
                bcrypt.compare(password, user.password, (err, result) => {
                    if(result) {
                        // delete user.password;

                        const {password, ...currentUser} = user;

                        let token = createToken({
                            _id: currentUser._id,
                            firstName: currentUser.firstName,
                            lastName: currentUser.lastName,
                            role: currentUser.role,
                            time: new Date().getTime()
                        }, "1d");

                        res.send({user: currentUser, token});
                    } else {
                        res.status(httpStatus.INVALID_DATA.status).send(httpStatus.INVALID_DATA.send);
                    }
                })
            } else {
                res.status(httpStatus.NOT_EXIST.status).send(httpStatus.NOT_EXIST.send);
            }
            console.log("USER:", user)
        })
        .catch((err) => {
            console.log("ERROR:", err)
            res.status(httpStatus.SERVICE_ERROR.status).send(httpStatus.SERVICE_ERROR.send);
        });
}

module.exports = login;