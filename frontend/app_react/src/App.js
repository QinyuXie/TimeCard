import React, {Component} from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import {Layout} from 'antd';
import LoginPage from "./pages/login/loginPage";
import './App.css';
import MainPage from "./pages/main/mainPage";

const {Header, Content, Sider} = Layout;

const LayoutCss = {
    height: "100%",
    width: "auto"
}
const layoutBackground = {
    background: "#fff",
}


export default class App extends Component {

    render() {
        return (
            <Switch>
                {/*{isLogined() ? (*/}
                {/*    <Route path="/"></Route>*/}
                {/*) : (*/}
                {/*    <Route path="/login"><LoginPage /></Route>*/}
                {/*)}*/}
                <Route path="/main"><MainPage/></Route>
                <Route path="/"><LoginPage/></Route>
                <Redirect to="/404"/>
            </Switch>
        )
    }

}