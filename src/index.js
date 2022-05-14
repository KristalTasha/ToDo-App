import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Login from './components/login';
import Signup from './components/signup';
import Home from './components/home';
import Auth from './auth/auth';
import Blocks from './components/page-blocks';
import reportWebVitals from './reportWebVitals';
import './index.css';

axios.defaults.baseURL = 'http://localhost:8000/api'
axios.defaults.withCredentials = true;


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<App />}>
          <Route index element={<Login />} />
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/signup" element={<Signup />} />

          <Route element={<Auth/>}>
          <Route path="/home" element={<Home />} />
          </Route>

          <Route path='/send-mail' element={<Blocks.SendEmailForm/>} />

          <Route path='/reset-password' element={<Blocks.PassResetForm/>} />

        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
