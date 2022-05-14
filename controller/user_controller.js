const Users = require('../model/user_model');
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser');
const nodemailer = require('nodemailer');
const { generateToken, deleteToken } = require('../handlers/user_handler');
const { cookie } = require('express/lib/response');


const signUp = async (req, res) => {

    const { email, password } = req.body;

    try {
        const newUser = new Users(req.body);

        // const salt = await bcrypt.genSalt();
        // newUser.password = await bcrypt.hash(newUser.password, salt);              

        const user = await newUser.save();

        const token = generateToken(user._id);
        res.cookie('jwt', token, { maxAge: 3 * 60 * 60 * 24 * 1000, httpOnly: true });
        res.status(201).json({message: 'Successfully signed up'})
        console.log(`Successfully signed up ${user.email}`);

    } catch(error){
        console.log(error.message);
        if (error.message.includes('duplicate')){
            res.status(409).json('Email already exists');
            
        } 
         if(error.message.includes('validation failed: email')){
            console.log('the email error---', error.errors.email.message)
            res.status(401).json(error.errors.email.message);

        } 
         if(error.message.includes('Password length')){
            console.log('the password error---', error.errors.password.message )
            res.status(401).json(error.errors.password.message);
        }
            
        
    }


}


const logIn = async ( req, res ) => {

    const {email, password } = req.body;

    try{

        const user = await Users.findOne({email})

        if(user){
            const isSame = await bcrypt.compare(password, user.password)

            if(isSame){
                const token = generateToken(user._id)
                res.cookie('jwt', token, {maxAge: 3 * 60 * 60 * 24 * 1000, httpOnly: true });
                res.status(201).json({message: 'Successfully logged in', userId: user._id, userEmail: user.email});
                console.log(`Successfully logged in ${user.email}`)
            } else{
                res.status(401).json({message: "Incorrect password"})
                console.log("Incorrect password")
            }
        } else{
            res.status(401).json({message: "Email does not exist"})
            console.log("Email does not exist")
        }

    } catch(error){
        console.log(error.message)
    }

}


const sendPassResetMail = (req, res) => {

    const {
        email
    } = req.body

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'kristilaing@gmail.com',
            pass: 'rkirbehsbslfqsis'
        }
    });

    const mailOptions = {
      
        to: `${email}`,
        subject: 'Sending Email using Node.js',
        // text: 'Testing nodemailer!',
        html: `<div>
        <p>Follow link below to reset your password</p>
        <p>http://localhost:3000/reset-password</p>
        </div>`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

    res.send('We have sent an emial to your mail. Kindly check and respond.');


}




const resetPassword = async (req, res) => {
    try{
        const { email, password, newPassword } = req.body 

        const user = await Users.findOne({email})

     
        if(user){
            const isSame = await bcrypt.compare(password, user.password)

            let found = user.email;

            const updating = {
                password: newPassword
            }
    

            if(isSame){
                const salt = await bcrypt.genSalt();
                updating.password = await bcrypt.hash(updating.password, salt);  
                const newpass = await Users.updateOne({email: found }, updating);
                
               // newpass.save()            

                res.status(200).json({message: 'User password successfully changed', newpass})


            } else{
                console.log('Password is wrong')
                res.status(401).json({message: 'Password is wrong'})
            }
        } else{
            console.log('Email does not exist')
            res.status(401).json({message: 'Email does not exist'})
        }


    } catch(error){
        console.log(error)
    }
}



const logOut = async (req, res) => {
    try{
        const userLogout = Users.findById(req.params.id)
      if(userLogout){
        const deltoken = deleteToken(userLogout._id)
        res.cookie('jwt', deltoken, {maxAge: 0, httpOnly: true})
        res.status(201).json()
        console.log(`${userLogout._id} successfully logged out`)
        // res.redirect('/api/todos');
      }
        
    } catch(error){
        console.log(error.message)
    }
}


// const logOut = async (req, res) => {
//     try{
//         res.cookie('jwt', deleteToken, {maxAge: -1, httpOnly: true})
//         res.status(201).json()
//         console.log('User successfully logged out')
        
//     } catch(error){
//         console.log(error.message)
//     }
// }


const userTodos = async (req, res) => {
    const {id } = req.params
    const user = await Users.findById(id).populate("todos")
    // const userTodoList = user.populate("todos");
    res.send(user.todos)

}

module.exports = {
    signUp,
    logIn,
    logOut,
    userTodos, 
    sendPassResetMail,
    resetPassword
}
