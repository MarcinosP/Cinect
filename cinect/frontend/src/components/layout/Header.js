import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import "./Header.css";
import logo from "../../img/logo.png";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { deepPurple } from "@material-ui/core/colors";

const Header = (props) => {
    // const { isAuthenticated, user } = this.props.auth;

    const useStyles = makeStyles((theme) => ({
        root: {
            display: "flex",
            "& > *": {
                margin: theme.spacing(1),
            },
        },
        purple: {
            color: theme.palette.getContrastText(deepPurple[500]),
            backgroundColor: deepPurple["A400"],
            width: theme.spacing(5),
            height: theme.spacing(5),
            fontSize: "0.6",
            margin: "auto 1vw auto auto",
        },
    }));
    const classes = useStyles();

    return (
        <div className="header">
            <div className="logo-div">
                <img className="logo" src={logo} alt={"this is avatar image"} />
            </div>
            <Avatar onClick={props.logout} className={classes.purple}></Avatar>
        </div>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Header);
