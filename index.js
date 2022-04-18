const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const path = require("path");
const Todos = require('./routes/todo_router')
const UserReg = require('./routes/user_router');
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

app.use("/api/todos", Todos);
app.use('/user', UserReg);


app.listen(PORT, () => console.log(`Server running on ${PORT}`));