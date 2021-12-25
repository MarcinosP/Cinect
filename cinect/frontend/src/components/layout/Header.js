import { makeStyles } from "@material-ui/core/styles";
import { deepPurple } from "@material-ui/core/colors";
import Avatar from "@material-ui/core/Avatar";
import { logout } from "../../actions/auth";
import { useEffect, useState } from "react";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import logo from "../../img/logo.png";
import PropTypes from "prop-types";
import axios from "axios";
import "./Header.css";

const Header = (props) => {
    const [userAvatar, setUserAvatar] = useState("");
    useEffect(() => {
        getAvatar();
    }, []);

    const getAvatar = async () => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Token " + props.token,
            },
        };

        await axios.get(`api/auth/user-details`, config).then((response) => {
            setUserAvatar(response.data[0].avatar);
        });
    };

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
            <Avatar src={userAvatar} onClick={props.logout} className={classes.purple}></Avatar>
        </div>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    token: state.auth.token,
});

export default connect(mapStateToProps, { logout })(Header);
