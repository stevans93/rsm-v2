const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config/config');

const createToken = (payload, expiresIn) => {
    return jwt.sign(payload, SECRET_KEY, {expiresIn});
}

module.exports = createToken;