const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');
const { httpStatus } = require('../config/constants');
const { SECRET_KEY } = require('../config/config');

const verifyToken = (req, res, next) => {
    if(req.headers.hasOwnProperty("authorization")) {
        let token = req.headers.authorization;

        jwt.verify(token, SECRET_KEY, async(error, decode) => {
            if(error) {
                res.status(httpStatus.TOKEN_EXPIRIES.status).send(httpStatus.TOKEN_EXPIRIES.send);
            } else {
                try {
                    const user = await UserModel.findOne({_id: decode._id});

                    if(user) {
                        req.locals = {
                            firstName: user.firstName,
                            lastName: user.lastName,
                            role: user.role,
                            _id: decode._id
                        }
                        next();
                    } else {
                        res.status(httpStatus.TOKEN_EXPIRIES.status).send({msg: "Token is invalid!"});
                    }
                } catch (error) {
                    res.status(httpStatus.SERVICE_ERROR.status).send(httpStatus.SERVICE_ERROR.send);
                }
            }
        });
    } else {
        res.status(httpStatus.TOKEN_EXPIRIES.status).send({msg: "You are not logged in!"});
    }
}

module.exports = verifyToken;