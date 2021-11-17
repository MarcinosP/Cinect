import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import "../styles/app.css"

import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import Header from "./layout/Header";
import Dashboard from "./leads/Dashboard";
import Alerts from "./layout/Alerts";
import Login from "./accounts/Login";
import Register from "./accounts/Register";
import PrivateRoute from "./common/PrivateRoute";

import { Provider } from "react-redux";
import store from "../store";
import { loadUser } from "../actions/auth";
import AddMovies from "../pages/AddMovies";
import AddSeries from "../pages/AddSeries";
import AllUsers from "../pages/AllUsers";
import FriendList from "../pages/FriendList";
import ShowFriend from "./layout/ShowFriend/ShowFriend";
import Settings from "../pages/Settings";
import Profile from "../pages/Profile";

// Alert Options
const alertOptions = {
    timeout: 3000,
    position: "top center",
};

class App extends Component {
    componentDidMount() {
        store.dispatch(loadUser());
    }

    render() {
        return (
            <Provider store={store}>
                <AlertProvider template={AlertTemplate} {...alertOptions}>
                    <Router>
                        <Fragment>
                            <Alerts />
                            {/* <div className="container"> */}
                                <Switch>
                                    <Route exact path="/register" component={Register} />
                                    <Route exact path="/login" component={Login} />
                                    <PrivateRoute exact path="/" component={Profile} />
                                    <PrivateRoute exact path="/movies" component={AddMovies} />
                                    <PrivateRoute exact path="/series" component={AddSeries} />
                                    <PrivateRoute exact path="/all_users" component={AllUsers} />
                                    <PrivateRoute exact path="/friend_list" component={FriendList} />
                                    <PrivateRoute exact path="/show_friend" component={ShowFriend} />
                                    <PrivateRoute exact path="/settings" component={Settings} />
                                </Switch>
                            {/* </div> */}
                        </Fragment>
                    </Router>
                </AlertProvider>
            </Provider>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("app"));
