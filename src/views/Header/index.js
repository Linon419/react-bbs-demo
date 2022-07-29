import React,{useEffect} from "react";
import { useNavigate, Link  } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import {userIsLogined,signOut} from "../../api";
import { notification } from "antd";
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
      if(res.data.code === 0){
        dispatch({type:'set-isLogined',payload:true})
        dispatch({type:'set-loginedUser',payload:res.data.user })
      }
    })
  }, []);

  const dispatch = useDispatch()
  const navigate = useNavigate();
  const quit = () => {
    signOut().then(res => {
      if(res.data.code === 0){
        notification.open({
          message: "登出成功！",
          description: "您已成功登出，欢迎再来玩哦",
          icon: <SmileOutlined style={{ color: "#108ee9" }} />,
        });
        dispatch({type:'set-isLogined',payload:false})
        dispatch({type:'set-loginedUser',payload:{}})
      }else{
        notification.open({
          message: '登出失败！',
          description:
            '发生未知错误，很抱歉',
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
          <span>ABC</span>
        </div>
        <div className="right-login">
          {isLogined ? (
            <div className="logined">
              <div className="sign-out" onClick={quit}>
                登出
              </div>
              <div className="user">{loginedUser.name}</div>
              <div className="home" onClick={goToHome}>首页</div>
            </div>
          ) : (
            <div className="no-logined">
               <Link className="/home" to="home">Home</Link> |{" "}
               <Link to="login">Login</Link>
               <Link to="register">Register</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;