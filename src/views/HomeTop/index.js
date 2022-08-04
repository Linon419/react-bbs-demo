import React from 'react';
import {useSelector} from 'react-redux';
import { Button } from 'antd';
import { useNavigate } from "react-router-dom";
import './index.scss'


const HomeTop = () => {
  const isLogined = useSelector(state => state.user.isLogined)
  const loginedUser = useSelector(state => state.user.loginedUser)
  const navigate = useNavigate()
  const goPost = () => {
    navigate("/createpost")
  }
  return (
    <div className="home-top">
      {
        isLogined? (
          <div className="logined">
            <div className="welcome"> Hello, {loginedUser.name} </div>
            <div className="message">You already login</div>
            <Button type="primary" onClick={goPost}>New post</Button>
          </div>
        ):(
          <div className="unlogined">
            <div className="welcome">Welcome</div>
            <div className="message">Please login</div>
            <Button disabled>New post</Button>
          </div>
        )
      }
    </div>
   );
}

export default HomeTop;