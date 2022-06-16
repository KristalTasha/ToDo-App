const nodemailer = require('nodemailer');

module.exports.configureMail = async (from, to, subject, text, replyTo) => {

    const mailOptions = {
        from, to, subject, text, replyTo
    }

    const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.USER_PASSWORD
        }
    });

    return await transporter.sendMail(mailOptions)

}