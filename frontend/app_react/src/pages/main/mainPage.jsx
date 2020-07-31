import {Col, Layout, Row, Tabs} from 'antd';
import React, {Component} from "react";
import './mainPage.css'
import TimeClockCard from "./timeclock";
import InfiniteListExample from "./shift-list";
import Card from "antd/es/card";

const {TabPane} = Tabs;

function callback(key) {
    console.log(key);
}

const {Header, Content, Footer} = Layout;

const DataTabs = () => (
    <Card title="Time Sheets">
        <InfiniteListExample/>
    </Card>
)

export default class MainPage extends Component {
    render() {
        return (
            <Layout className={"main-page"}>
                <Header>
                    {/*<div className="logo"/>*/}
                    {/*<Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>*/}
                    {/*    <Menu.Item key="1">nav 1</Menu.Item>*/}
                    {/*    <Menu.Item key="2">nav 2</Menu.Item>*/}
                    {/*    <Menu.Item key="3">nav 3</Menu.Item>*/}
                    {/*</Menu>*/}
                </Header>
                <Content style={{padding: '5% 5%'}}>
                    <Row gutter={32}>
                        <Col xs={24} xl={8}>
                            <div className='time-clock-card'><TimeClockCard/></div>
                        </Col>
                        <Col xs={24} xl={16}>
                            <div className="site-layout-content"><DataTabs/></div>
                        </Col>
                    </Row>
                </Content>
            </Layout>
        )
    }
}