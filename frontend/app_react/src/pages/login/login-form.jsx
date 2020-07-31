import {Button, Checkbox, Form, Input, message} from 'antd';
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import React from "react";
import {loginServer} from "../../api/server";
import {withRouter} from 'react-router-dom';

const login_form_style = {
    maxWidth: "300px",
};

const NormalLoginForm = (props) => {
    // const {history, location, match} = this.props
    const onFinish = async values => {
        // \\console.log('Received values of form: ', values);
        // console.log(props);
        const data = {
            username: values.username,
            password: values.password
        }

        const res = await loginServer(data).then(function (response) {
            const data = response.data;
            console.log(data);
            return data;
        })
        console.log(res);
        if (!res['success']) {
            console.log("failed")
            message.error('Login failed, please try again.')
        } else {
            props.history.push('/main')
            console.log("logined successfully")
            message.success("Login successfully!")
        }
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
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
                </Button>
                Or <a href="/register">register now!</a>
            </Form.Item>
        </Form>
    );
};

export default withRouter(NormalLoginForm);