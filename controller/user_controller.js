const Users = require('../model/user_model');
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser');
const { generateToken, deleteToken } = require('../handlers/user_handler');
const { cookie } = require('express/lib/response');


const signUp = async (req, res) => {

    const { email, password } = req.body;

    try {
        const newUser = new Users(req.body);
        const user = await newUser.save();
        const token = generateToken(user._id);
        res.cookie('jwt', token, { maxAge: 3 * 60 * 60 * 24 * 1000, httpOnly: true });
        res.status(201).json({message: 'Successfully signed up'})
        console.log(`Successfully signed up ${user.email}`);

    } catch(error){
        console.log(error.message);
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
                res.status(201).json({message: 'Successfully logged in'});
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

module.exports = {
    signUp,
    logIn,
    logOut
}
