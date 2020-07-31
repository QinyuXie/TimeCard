import React, {useState} from 'react';
import {AutoComplete, Button, Checkbox, Form, Input, message, Select,} from 'antd';

import {loginServer, registerServer} from "../../api/server";
import {withRouter} from "react-router";

const {Option} = Select;
const AutoCompleteOption = AutoComplete.Option;

const formItemLayout = {
    labelCol: {
        xs: {span: 24},
        sm: {span: 8},
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 16},
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

const RegistrationForm = (props) => {
    const [form] = Form.useForm();

    const onFinish = values => {
        // console.log('Received values of form: ', values);
        const new_employee = {
            username: values.username,
            first_name: values.first_name,
            last_name: values.last_name,
            email: values.email,
            phone: values.phone,
            password: values.password
        }
        registerServer(new_employee).then(function (res) {
            if (!res['success']) {
                message.error(res['mess']);
            } else {
                message.success("Congradulation! You have registered successfully!");
                const data = {
                    username: values.username,
                    password: values.password
                }

                loginServer(data).then(function (response) {
                    const data = response.data;
                    if (!data['success']) {
                        console.log("failed")
                    } else {
                        console.log("success")
                        props.history.push('/main')
                    }
                })
            }
        })
    };

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select style={{width: 70}}>
                <Option value="1">+1</Option>
            </Select>
        </Form.Item>
    );

    const [autoCompleteResult, setAutoCompleteResult] = useState([]);

    const onWebsiteChange = value => {
        if (!value) {
            setAutoCompleteResult([]);
        } else {
            setAutoCompleteResult(['.com', '.org', '.net'].map(domain => `${value}${domain}`));
        }
    };

    const websiteOptions = autoCompleteResult.map(website => ({
        label: website,
        value: website,
    }));

    return (
        <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            initialValues={{
                prefix: '1',
            }}
            scrollToFirstError
        >
            <Form.Item
                name="username"
                label="Username"
                rules={[{required: true, message: 'Please input your username!', whitespace: true}]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                name="first_name"
                label="First Name"
                rules={[{required: true, message: 'Please input your first name!', whitespace: true}]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                name="last_name"
                label="Last Name"
                rules={[{required: true, message: 'Please input your last name!', whitespace: true}]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                name="email"
                label="E-mail"
                rules={[
                    {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                    },
                    {
                        required: true,
                        message: 'Please input your E-mail!',
                    },
                ]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                name="password"
                label="Password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                    {min: 4, message: 'Username must contains at least 4 characters'},
                    {max: 12, message: 'Username must contains at most 12 characters'},
                ]}
                hasFeedback
            >
                <Input.Password/>
            </Form.Item>

            <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please confirm your password!',
                    },
                    ({getFieldValue}) => ({
                        validator(rule, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject('The two passwords that you entered do not match!');
                        },
                    }),
                ]}
            >
                <Input.Password/>
            </Form.Item>

            {/*  <Form.Item*/}
            {/*      name="nickname"*/}
            {/*      label={*/}
            {/*          <span>*/}
            {/*  Nickname&nbsp;*/}
            {/*              <Tooltip title="What do you want others to call you?">*/}
            {/*    <QuestionCircleOutlined/>*/}
            {/*  </Tooltip>*/}
            {/*</span>*/}
            {/*      }*/}
            {/*      rules={[{required: true, message: 'Please input your nickname!', whitespace: true}]}*/}
            {/*  >*/}
            {/*      <Input/>*/}
            {/*  </Form.Item>*/}

            {/*<Form.Item*/}
            {/*  name="residence"*/}
            {/*  label="Habitual Residence"*/}
            {/*  rules={[*/}
            {/*    { type: 'array', required: true, message: 'Please select your habitual residence!' },*/}
            {/*  ]}*/}
            {/*>*/}
            {/*  <Cascader options={residences} />*/}
            {/*</Form.Item>*/}

            <Form.Item
                name="phone"
                label="Phone Number"
                rules={[{required: true, message: 'Please input your phone number!'}]}
            >
                <Input addonBefore={prefixSelector} style={{width: '100%'}}/>
            </Form.Item>

            {/*<Form.Item*/}
            {/*  name="website"*/}
            {/*  label="Website"*/}
            {/*  rules={[{ required: true, message: 'Please input website!' }]}*/}
            {/*>*/}
            {/*  <AutoComplete options={websiteOptions} onChange={onWebsiteChange} placeholder="website">*/}
            {/*    <Input />*/}
            {/*  </AutoComplete>*/}
            {/*</Form.Item>*/}

            {/*<Form.Item label="Captcha" extra="We must make sure that your are a human.">*/}
            {/*  <Row gutter={8}>*/}
            {/*    <Col span={12}>*/}
            {/*      <Form.Item*/}
            {/*        name="captcha"*/}
            {/*        noStyle*/}
            {/*        rules={[{ required: true, message: 'Please input the captcha you got!' }]}*/}
            {/*      >*/}
            {/*        <Input />*/}
            {/*      </Form.Item>*/}
            {/*    </Col>*/}
            {/*    <Col span={12}>*/}
            {/*      <Button>Get captcha</Button>*/}
            {/*    </Col>*/}
            {/*  </Row>*/}
            {/*</Form.Item>*/}

            <Form.Item
                name="agreement"
                valuePropName="checked"
                rules={[
                    {validator: (_, value) => value ? Promise.resolve() : Promise.reject('Should accept agreement')},
                ]}
                {...tailFormItemLayout}
            >
                <Checkbox>
                    I have read the <a href="">agreement</a>
                </Checkbox>
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                    Register
                </Button>
            </Form.Item>
        </Form>
    );
};

export default withRouter(RegistrationForm);