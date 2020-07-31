import React, {Component} from "react";
import {Col, Layout, Row, Typography} from "antd";
import RegistrationForm from "./register_form";

const {Title} = Typography;

export default class RegisterPage extends Component {
    render() {
        return (
            <Layout className={"login-page"}>
                <Row>
                    <Col xs={2} sm={4} md={6} lg={6} xl={8}></Col>
                    <Col xs={20} sm={16} md={12} lg={12} xl={8}>
                        <section className={"registration-content"}>
                            <Title level={2}>Register</Title>
                            <RegistrationForm className={"registration-form"}></RegistrationForm>
                        </section>
                    </Col>
                    <Col xs={2} sm={4} md={6} lg={6} xl={8}></Col>
                </Row>
            </Layout>
        )
    }
}