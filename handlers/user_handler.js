const jwt = require('jsonwebtoken');

module.exports.generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET,{
        expiresIn: 3 * 24 * 60 * 60 * 1000
    });
};

module.exports.deleteToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: 0 * 1000
    });
};