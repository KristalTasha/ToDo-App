const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, "Kindly enter in an email address"],
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, "Kindly enter in your password"],
        minlength: [5, 'Password length should exceed 5 characters']
    }
})

userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

const User = mongoose.model("User", userSchema);

module.exports = User;

