const nodemailer = require('nodemailer');

module.exports.configureMail = async (to, subject, html, replyTo, res) => {

    const mailOptions = {
        to, subject, html, replyTo
    }

    const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.USER_PASSWORD
        }
    });

    return await transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);

            if(subject.includes('Activation')){
                res.status(200).json('We have sent an account activation link to your email. Kindly check and respond to complete your registration.');
            } 

            
            if(subject.includes('Reset')){
                res.status(200).json('We have sent you an email to reset your password. Kindly check and respond.');
            } 
           
        }
    });


}