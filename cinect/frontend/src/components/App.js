import React, { Component } from "react";
import ReactDOM from "react-dom";

import Header from "./layout/Header";
import Dashboard from "./leads/Dashboard";
import Login from "./accounts/Login";
// import Register from "./accounts/Register";
import Alerts from "./layout/Alerts";

import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { HashRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../store";
import Register from "./accounts/Register";
import PrivateRoute from "./common/PrivateRoute";
import {loadUser} from "../actions/auth"

// Alert Options
const alertOptions = {
    timeout: 3000,
    position: "bottom center",
};

class App extends Component {
    componentDidMount(){
        store.dispatch(loadUser())
    }
    render() {
        return (
            <Provider store={store}>
                <AlertProvider template={AlertTemplate} {...alertOptions}>
                    <Router>
                        <>
                            <Header />
                            <Alerts />
                            <div className="container">
                                <Routes>
                                    <Route path="/" element={<Dashboard />} />
                                    <Route exact path="/register" element={<Register />} />
                                    <Route exact path="/login" component={Login} />
                                </Routes>
                            </div>
                        </>
                    </Router>
                </AlertProvider>
            </Provider>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("app"));
