import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userIsLogined, signOut } from "../../api";
import { notification, Button } from "antd";
import { SmileOutlined, FrownTwoTone } from "@ant-design/icons";
import './index.scss'

const Header = () => {
  const isLogined = useSelector((state) => state.user.isLogined);
  const loginedUser = useSelector((state) => state.user.loginedUser);
  // const isLogined = false
  // const loginedUser = {name: 'xj',age:'21'}

  //页面挂载的时候，判断有没有cookie，然后设置页面的登录状态
  useEffect(() => {
    userIsLogined().then(res => {
      if (res.data.code === 0) {
        dispatch({ type: 'set-isLogined', payload: true })
        dispatch({ type: 'set-loginedUser', payload: res.data.user })
      }
    })
  }, []);

  const dispatch = useDispatch()
  const navigate = useNavigate();
  const quit = () => {
    signOut().then(res => {
      if (res.data.code === 0) {
        notification.open({
          message: "Successful logout！",
          description: "You have successfully logged out, welcome to play again!",
          icon: <SmileOutlined style={{ color: "#108ee9" }} />,
        });
        dispatch({ type: 'set-isLogined', payload: false })
        dispatch({ type: 'set-loginedUser', payload: {} })
      } else {
        notification.open({
          message: 'Logout failure！',
          description:
            "An unknown error occurred",
          icon: <FrownTwoTone style={{ color: '#ff4c4c' }} />,
        });
      }
    })
  };

  const goToHome = () => {
    navigate("/home/total");
  };
  const login = () => {
    navigate("/login")
  }
  const register = () => {
    navigate("/register")
  }

  return (
    <div className="header">
      <div className="header-container">
        <div className="left-log">
          <span onClick={goToHome}>ABC</span>
        </div>
        <div className="right-login">
          {isLogined ? (
            <div className="logined">
              <div className="sign-out" onClick={quit}>
              Log out
              </div>
              <div className="user">{loginedUser.name}</div>
              <div className="home" onClick={goToHome}>Home</div>
            </div>
          ) : (
            <div className="no-logined">
              <div onClick={login}>Signin</div>
              <div onClick={register}>Register</div>
              <div className="home" onClick={goToHome}>Home</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;