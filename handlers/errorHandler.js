
module.exports.handleError = async ( error, res) => {

    console.log('the error----', error.errors)

    if (error.code === 11000) {
        res.status(409).json('Email already exists');

    } else if (error.errors.email) {
        // console.log('the email error---', error.errors.email.message)
        res.status(401).json(error.errors.email.message);

    } else if (error.errors.password) {
        // console.log('the password error---', error.errors.password.message)
        res.status(401).json(error.errors.password.message);
    }

}