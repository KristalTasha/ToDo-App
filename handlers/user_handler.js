const jwt = require('jsonwebtoken');

module.exports.generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET,{
        expiresIn: 3 * 24 * 60 * 60 * 1000
    });
};

//generating the verification token
module.exports.verificationToken = (email) => {
    return jwt.sign({ email }, process.env.VERIFY_SECRET)
};

//with id
module.exports.deleteToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: 0 
    });
};

//without id
// module.exports.deleteToken = () => {
//     return jwt.sign(process.env.JWT_SECRET, {
//         expiresIn: 0 
//     });
// };