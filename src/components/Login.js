import { Layout, message } from 'antd';
import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const { Header, Footer, Sider, Content } = Layout;
function Login() {
    const nav = useNavigate()
    const onFinish = (values) => {
        console.log('Success:', values);
        axios.post(`https://class.nodemy.vn/api/login`,values, {
            headers: {
                Authorization:`Bearer ${localStorage.getItem('Token')}`
              }        
        })
        .then(res => {
            console.log(res);
            nav('/data')
            localStorage.setItem("Token",res.data.data.token)
            localStorage.setItem("username",res.data.data.user.name)
        })
        .catch(err=> message.error("Đăng nhập thất bại"))
      };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      }
  return (
    <Layout>
      <Header style={{backgroundColor:"pink"}}>XIN CHÀO</Header>
      <Content>
      <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="email"
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

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </Form.Item>
    </Form>
      </Content>
      <Footer style={{backgroundColor:"pink"}}>Footer</Footer>
    </Layout>
  )
}

export default Login