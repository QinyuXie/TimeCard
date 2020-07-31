import React, {Component} from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import LoginPage from "./pages/login/loginPage";
import './App.css';
import MainPage from "./pages/main/mainPage";
import AdminPage from "./pages/admin/adminPage";
import RegisterPage from "./pages/login/registerPage";
import {isLogined} from "./utils/auth";


export default class App extends Component {

    render() {
        return (
            <Switch>
                {isLogined() ? (
                    <Route path="/main"><MainPage/></Route>
                ) : (
                    <Route path="/login"><LoginPage/></Route>
                )}
                <Route path="/admin"><AdminPage/></Route>
                <Route path="/login"><LoginPage/></Route>
                <Route path="/register"><RegisterPage/></Route>
                <Route path="/"><Redirect to="/login"/></Route>
                <Redirect to="/404"/>
            </Switch>
        )
    }

}