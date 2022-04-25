const jwt = require('jsonwebtoken');


module.exports.authUser = (req, res, next) => {
    const token = req.cookie.jwt
    console.log('the token---', token)

    if(token){
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if(err){
                res.send(err.message)
                console.log(err.message)
            } else{
                console.log(decoded)
                next();
            }
        })
    } else{
        res.json('token does not exist');
        console.log('token does not exist')
    }
}