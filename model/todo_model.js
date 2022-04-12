const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const TodoSchema = new Schema({
    todo: {
        type: String
    },
    status: {
        type: String,
        default: "pending"
    }
}, {timestamps: true})

const Todo = mongoose.model('Todo', TodoSchema);

module.exports = {
    Todo
}