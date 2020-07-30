import {Button, Checkbox, Form, Input} from 'antd';
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {get} from "../../utils/request"
import React from "react";

const login_form_style = {
    "max-width": "300px",
}


const handleClick = () => {
    console.log(get("/api/employees/"));
}

const NormalLoginForm = () => {

    const onFinish = values => {
        console.log('Received values of form: ', values);
    };

    const onFinishFailed = errorInfo => {
        console.log('LoginPage Failure:', errorInfo);
    };

    return (
        <Form
            name="normal_login"
            className="login-form"
            style={login_form_style}
            initialValues={{remember: true}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label="Username"
                name="username"
                rules={[
                    {required: true, message: 'Please input your Username!'},
                    {min: 4, message: 'Username must contains at least 4 characters'},
                    {pattern: /^[a-zA-Z0-9_]+$/, message: 'Username must be a combination of letters and digits.'}
                ]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Username"/>
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[
                    {required: true, message: 'Please input your Password!'},
                    {min: 4, message: 'Username must contains at least 4 characters'},
                    {max: 12, message: 'Username must contains at most 12 characters'},
                ]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon"/>}
                    type="password"
                    placeholder="Password"
                />
            </Form.Item>
            <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <a className="login-form-forgot" href="">
                    Forgot password
                </a>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button" onClick={handleClick}>
                    Log in
                </Button>
                Or <a href="/register">register now!</a>
            </Form.Item>
        </Form>
    );
};

export default NormalLoginForm;