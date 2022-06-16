const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {
    type
} = require('express/lib/response')

const {
    Schema
} = mongoose;

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
        minlength: [5, 'Password length should exceed 4 characters']
    },
    todos: [{
        type: Schema.Types.ObjectId,
        ref: 'Todo'
    }],
    resetToken: String,

    status: {
        type: String,
        enum: ['Pending', 'Active'],
        default: 'Pending'
    },
    verificationCode: {
        type: String,
        unique: true
    }
})

userSchema.pre('save', async function (next) {
    if (this.password.length > 50) {
        next()
    }

    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

const User = mongoose.model("User", userSchema);

module.exports = User;