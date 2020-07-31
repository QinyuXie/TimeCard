import React, {Component} from "react";
import {Col, Layout, Row, Typography} from 'antd';

import NormalLoginForm from './login-form';
import './login.css'

const {Header} = Layout;
const {Title} = Typography;

/*
login router compontent
 */

export default class LoginPage extends Component {
    render() {
        return (
            <Layout className={"login-page"}>
                <Row>
                    <Col xs={0} sm={4} md={6} lg={8} xl={9}></Col>
                    <Col xs={24} sm={16} md={12} lg={8} xl={6}>
                        <section className={"login-content"} style={{maxWidth: '350px'}}>
                            <Title level={2}>Login in</Title>
                            <NormalLoginForm className={"login-form"}></NormalLoginForm>
                        </section>
                    </Col>
                    <Col xs={0} sm={4} md={6} lg={8} xl={9}></Col>
                </Row>
            </Layout>
        )
    }
}