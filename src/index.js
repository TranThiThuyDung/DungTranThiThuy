import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/antd.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Login';
import Data from './components/Data';
import Details from './components/Details';
import Layout from './components/Layout';
import Home from './components/Home';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path='/' element={<Layout />}>
          <Route path="/home" element={<Home/>} />
          <Route path="/data" element={<Data />} />
          <Route path='/data/:id' element={<Details />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
