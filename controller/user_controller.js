const Users = require('../model/user_model');
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser');
const nodemailer = require('nodemailer');
const {v4: uuidv4} = require('uuid');
const { generateToken, verificationToken, deleteToken} = require('../handlers/user_handler');
const { cookie } = require('express/lib/response');
const { handleError } = require('../handlers/errorHandler')
const { configureMail } = require('../handlers/sendMail.config')


//signup controller with imported error handling and mail config
const signUp = async (req, res) => {

    const {
        email,
        password
    } = req.body;

    //generating the verification code using jwt handler verificationToken
    //const code = verificationToken(email);
    const code = uuidv4();
    console.log('verification code ---', code);

    try {
        const newUser = new Users({
            ...req.body,
            verificationCode: code
        });



        const user = await newUser.save((error) => {
                if (error) {
                   handleError(error, res)

                } else {
                 configureMail(email,
                     'ToDo-App: Account Activation', 
                     `<div>
                     <p>Kindly follow the link below to activate your account</p>
                     <p>http://localhost:3000/account-activation/${code}</p>
                     </div>`,
                     'dummy@gmail.com', 
                     res)

                }

            }

        );

    } catch (error) {
        console.log(error);

    }


}


const activateAccount = async (req, res) => {

    try {

        const user = await Users.findOne({
            verificationCode: req.params.verificationCode
        })

        if (user) {
            user.status = 'Active';

            user.save(err => {
                if (err) {
                    res.status(500).json({
                        message: err
                    })
                } else {

                    const token = generateToken(user._id);
                    res.cookie('jwt', token, {
                        maxAge: 3 * 60 * 60 * 24 * 1000,
                        httpOnly: true
                    });
                    res.status(201).json({
                        message: 'Your account has been activated! Kindly Login.'
                    })
                    console.log(`Successfully signed up ${user.email}`);
                }
            })

        } else {
            res.status(404).json('Account not found.')
        }


    } catch (err) {
        res.status(401).json({
            message: err
        })
        console.log(err)
    }

}


const logIn = async (req, res) => {

    const {
        email,
        password
    } = req.body;

    try {

        const user = await Users.findOne({
            email
        })

        if (user) {
            const isSame = await bcrypt.compare(password, user.password)

            if (isSame) {

                //checking if user email has been verified
                if (user.status === 'Active') {
                    const token = generateToken(user._id)
                    res.cookie('jwt', token, {
                        maxAge: 3 * 60 * 60 * 24 * 1000,
                        httpOnly: true
                    });
                    res.status(201).json({
                        message: 'Successfully logged in',
                        userId: user._id,
                        userEmail: user.email
                    });
                    console.log(`Successfully logged in ${user.email}`)
                } else {
                    res.status(401).json('Account is pending verification. Kindly verify your email.')
                }


            } else {
                res.status(401).json("Wrong email or password")
                console.log("Incorrect password")
            }
        } else {
            res.status(401).json("Wrong email or password")
            console.log("Email does not exist")
        }

    } catch (error) {
        res.status(401).json("Kindly enter in your email")
        console.log(error.message)
    }

}



const forgotPasswordLink = async (req, res) => {

    try {


        const {
            email
        } = req.body

        const resetToken = uuidv4();


        const updateUserToken = await Users.findOneAndUpdate({
            email
        }, {
            resetToken
        }, {
            new: true
        })

        if (!updateUserToken) {
            res.status(401).json('Email cannot be found')
        }


        configureMail(email,
            'ToDo-App: Reset Your Password', 
            `<div>
            <p>Kindly follow the link below to reset your password</p>
            <p>http://localhost:3000/reset-password/${resetToken}</p>
            </div>`,
            'dummy@gmail.com', 
            res)



    } catch (error) {
        console.log('error', error);
    }

}



const resetPassword = async (req, res) => {
    try {
        const {
            email,
            oldPassword,
            newPassword
        } = req.body

        const user = await Users.findOne({
            email
        })


        if (user) {
            const isSame = await bcrypt.compare(oldPassword, user.password)

            let found = user.email;

            const updating = {
                password: newPassword
            }


            if (isSame) {

                if (newPassword.length < 5) {
                    res.status(409).json({
                        message: 'Password length should exceed 4 characters'
                    })

                } else {

                    const salt = await bcrypt.genSalt();
                    updating.password = await bcrypt.hash(updating.password, salt);
                    const newpass = await Users.updateOne({
                        email: found
                    }, updating);

                    res.status(200).json({
                        message: 'User password successfully changed',
                        newpass
                    })

                }


            } else {
                console.log('Old password is wrong')
                res.status(401).json({
                    message: 'Old password is wrong'
                })
            }
        } else {
            console.log('User does not exist')
            res.status(401).json({
                message: 'User does not exist'
            })
        }


    } catch (error) {
        console.log(error)
    }
}


const resetForgottenPassword = async (req, res) => {

    try {
        const {
            resetToken
        } = req.params;
        const {
            newPassword
        } = req.body;

        const hashed = await bcrypt.hash(newPassword, 12);

        await Users.findOneAndUpdate({
            resetToken
        }, {
            password: hashed
        }, {
            new: true
        })

        res.status(200).json({
            message: 'User password successfully changed'
        })

    } catch (error) {
        console.log(error)
        res.status(500).json('Oops! Something is wrong. Please try again')
    }


}


const logOut = async (req, res) => {
    try {
        const userLogout = Users.findById(req.params.id)
        if (userLogout) {
            const deltoken = deleteToken(userLogout._id)
            res.cookie('jwt', deltoken, {
                maxAge: 0,
                httpOnly: true
            })
            res.status(201).json()
            console.log(`${userLogout._id} successfully logged out`)
            // res.redirect('/api/todos');
        }

    } catch (error) {
        console.log(error.message)
    }
}



const userTodos = async (req, res) => {
    const {
        id
    } = req.params
    const user = await Users.findById(id).populate("todos")
    res.send(user.todos)

    // const todosByDate = user.todos.sort({createdAt: -1}, (err, docs) => {
    //     if(err){
    //         console.log('todosByDate error---', err)
    //     } else{
    //         console.log('todosByDate---', docs)
    //     }
    // })
    // console.log(todosByDate)

}

module.exports = {
    signUp,
    activateAccount,
    logIn,
    logOut,
    userTodos,
    forgotPasswordLink,
    resetPassword,
    resetForgottenPassword
}