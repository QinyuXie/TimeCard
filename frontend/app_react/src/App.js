import React, {Component} from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import LoginPage from "./pages/login/loginPage";
import './App.css';
import MainPage from "./pages/main/mainPage";
import AdminPage from "./pages/admin/adminPage";

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
                <Route path="/admin"><AdminPage/></Route>
                <Route path="/"><LoginPage/></Route>
                <Redirect to="/404"/>
            </Switch>
        )
    }

}