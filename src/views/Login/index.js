import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { Button, Form, Input, Checkbox, notification } from "antd";
import { SmileOutlined, FrownTwoTone } from '@ant-design/icons';
import { CloseOutlined } from "@ant-design/icons";
import { login } from "../../api";

import './index.scss'


const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};


const Login = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const isLogined = useSelector(state => state.user.isLogined)
  const dispatch = useDispatch()

  const onFinish = (values) => {
    if (!isLogined) {
      let name = form.getFieldValue().username
      let email = form.getFieldValue().email
      let password = form.getFieldValue().password

      login(name,password).then(res => {
        if(res.data.code === -2){
          notification.open({
            message: 'user does not exist！',
            description:
              'User name is wrong, you may not be registered, please register and then log in again',
            icon: <FrownTwoTone style={{ color: '#ff4c4c' }} />,
          });
        }else if(res.data.code === -1){
          notification.open({
            message: 'Password error！',
            description:
              'Wrong login password, log in again',
            icon: <FrownTwoTone style={{ color: '#ff4c4c' }} />,
          });
        }else {
          notification.open({
            message: 'Login successful！',
            description:
              "You have successfully logged in, now you can post new posts, or reply to other people's posts, hope you have fun in ABC!:)",
            icon: <SmileOutlined style={{ color: '#108ee9' }} />,
          });
          dispatch({type:'set-isLogined',payload:true})
          dispatch({type:'set-loginedUser',payload:res.data.user})
          form.resetFields();
          navigate('/home/total')
        }
      })
    
      console.log('Success:', values);

    } else {
      notification.open({
        message: 'Please do not log in repeatedly！',
        description:
          'You have already logged in, please do not log in again, if you want to switch accounts, please log out and log in again！',
        icon: <FrownTwoTone style={{ color: '#ff4c4c' }} />,
      });
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const onReset = () => {
    form.resetFields();
  }

  const close = () => {
    navigate(-1)
  }

  return (
    <div className="user-login">
      <div className="header">Login</div>
      <Button className="close" icon={<CloseOutlined />} onClick={close}></Button>
      <Form
        {...layout}
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        form={form}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
