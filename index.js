const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const { addTodo, fetchTodos, fetchTodo, deleteTodo, updateTodo } = require('./controller/todo_controller')

const PORT = process.env.PORT || 8000;

const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(morgan("dev"));
app.use(cors());

//mongodb connection string
const mongoURL = process.env.mongoURL

//connect mongoose to the express server
mongoose.connect(mongoURL, {useNewUrlParser: true, useUnifiedTopology: true})
.then((result) => {
    if (result) console.log("mongodb connected");
})
.catch((err) => {
    console.log(err);
})

// app.use("/api/todos");

//saving a todo
app.post('/api/todos', addTodo);

//fetching from the db/server
app.get('/api/todos', fetchTodos)

//fetching a todo
app.get('/api/todos/:id', fetchTodo)

//deleting a todo
app.delete('/api/todos/:id', deleteTodo)

//updating a todo
app.put('/api/todos/:id', updateTodo)

app.listen(PORT, () => console.log(`Server running on ${PORT}`));