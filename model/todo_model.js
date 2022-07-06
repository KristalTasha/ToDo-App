const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const TodoSchema = new Schema({
    todo: {
        type: String
    },
    status: {
        type: String,
        default: "Pending"
    },
    date: {
        type: Date
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true})

const Todo = mongoose.model('Todo', TodoSchema);

module.exports = {
    Todo
}