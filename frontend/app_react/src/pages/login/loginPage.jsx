import React, {Component} from "react";
import {Col, Layout, Row, Typography} from 'antd';
import {Route, Switch} from "react-router-dom";

import NormalLoginForm from './login-form';
import './login.css'
import RegistrationForm from "./register_form";

const {Header} = Layout;
const {Title} = Typography;

/*
login router compontent
 */


export default class LoginPage extends Component {
    render() {
        return (
            <Layout className={"login"}>
                <Row>
                    <Switch>
                        <Route path="/login">
                            <Col xs={2} sm={4} md={6} lg={8} xl={10}></Col>
                            <Col xs={20} sm={16} md={12} lg={8} xl={4}>
                                <section className={"login-content"}>
                                    <Title level={2}>Login in</Title>
                                    <NormalLoginForm className={"login-form"}></NormalLoginForm>
                                </section>
                            </Col>
                            <Col xs={2} sm={4} md={6} lg={8} xl={10}></Col>
                        </Route>
                        <Route path="/register">
                            <Col xs={2} sm={4} md={6} lg={8} xl={8}></Col>
                            <Col xs={20} sm={16} md={12} lg={8} xl={8}>
                                <section className={"registration-content"}>
                                    <Title level={2}>Register</Title>
                                    <RegistrationForm className={"registration-form"}></RegistrationForm>
                                </section>
                            </Col>
                            <Col xs={2} sm={4} md={6} lg={8} xl={8}></Col>
                        </Route>
                    </Switch>
                </Row>
            </Layout>
        )
    }
}