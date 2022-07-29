import React from "react";
import { useEffect } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import Header from './views/Header'
import Home from "./views/Home";
import PostDetail from "./views/PostDetail";
import CreatePost from "./views/CreatePost";
import Login from "./views/Login";
import Register from "./views/Register";
// import 'antd/dist/antd.css'

import bcImg from "./assets/bgc.jpg";

import "./App.scss";


function App() {
  return (
    <div className="App">
      <div className="header-container">
        <Header></Header>
      </div>
      <div className="img">
        <img src={bcImg} alt="" />
      </div>
      <div className="content">
        <Routes>
          {/* <Route path="*" element={<App />}/> */}
            <Route path="/home/:path" element={<Home />} />
            <Route path="/postdetail/:postId" element={<PostDetail />} />
            <Route path="/createpost" element={<CreatePost />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />


        </Routes>
      </div>
    </div>
  );
}

export default App;