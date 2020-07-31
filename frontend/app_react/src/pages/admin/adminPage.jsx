import React, {Component} from "react";
import './adminPage.css'
import {Breadcrumb, Layout, Menu} from 'antd';
import {UserOutlined} from '@ant-design/icons';
import {Link, Route, Switch} from "react-router-dom";

const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;

const BasicLayout = () => {
    return (
        <Layout style={{width: '100%', height: '100%'}}>
            <Header className="header">
                {/*<div className="logo" />*/}
                {/*<Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>*/}
                {/*  <Menu.Item key="1">nav 1</Menu.Item>*/}
                {/*  <Menu.Item key="2">nav 2</Menu.Item>*/}
                {/*  <Menu.Item key="3">nav 3</Menu.Item>*/}
                {/*</Menu>*/}
            </Header>
            <Layout>
                <Sider width={200} className={'site-layout-background'}>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{height: '100%', borderRight: 0}}
                    >
                        <SubMenu key="sub1" icon={<UserOutlined/>} title="My Team">
                            <Menu.Item key="1">
                                <Link to={"/admin/members"}>Member List</Link>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Link to={"/admin/approval"}>Time Approval</Link>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <Link to={"/admin/payroll"}>Payroll Report</Link>
                            </Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout style={{padding: '0 24px 24px', height: '100%',}}>
                    <Breadcrumb style={{margin: '16px 0'}}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content
                        className={'site-layout-background'}
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                        }}
                    >
                        <Switch>
                            <Route path='/admin/members'></Route>
                            <Route path='/admin/approval'></Route>
                            <Route path="/admin/payroll"></Route>
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    )
}

export default class AdminPage extends Component {
    render() {
        return (
            <BasicLayout/>
        );
    }
}