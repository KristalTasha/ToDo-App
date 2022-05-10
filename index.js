const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const path = require("path");
const cookieParser = require('cookie-parser');
const nodemailer = require('nodemailer');
const Todos = require('./routes/todo_router')
const UserReg = require('./routes/user_router');
const cors = require("cors");

const PORT = process.env.PORT || 8000;

const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}))
app.use(morgan("dev"));
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000',
    methods: 'GET, POST, PUT, DELETE'
}));

//mongodb connection string
const mongoURL = process.env.mongoURL

//connect mongoose to the express server
mongoose.connect(mongoURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then((result) => {
        if (result) console.log("mongodb connected");
    })
    .catch((err) => {
        console.log(err);
    })

app.use("/api/todos", Todos);
app.use('/api/user', UserReg);


app.post('/mailer', (req, res) => {
    const {
        email,
        message
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
        html: `<div>${message}</div>`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

    res.send('We have sent an emial to your mail. Kindly check and respond.');
})



app.listen(PORT, () => console.log(`Server running on ${PORT}`));