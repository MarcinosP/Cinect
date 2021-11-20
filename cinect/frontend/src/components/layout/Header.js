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

export class Header extends Component {
    static propTypes = {
        auth: PropTypes.object.isRequired,
        logout: PropTypes.func.isRequired,
    };

    render() {
        const { isAuthenticated, user } = this.props.auth;

        // const useStyles = makeStyles((theme) => ({
        //     root: {
        //         display: "flex",
        //         "& > *": {
        //             margin: theme.spacing(1),
        //         },
        //     },
        //     purple: {
        //         color: theme.palette.getContrastText(deepPurple[500]),
        //         backgroundColor: deepPurple["A400"],
        //         width: theme.spacing(5),
        //         height: theme.spacing(5),
        //         fontSize: "0.6",
        //         margin: "auto",
        //     },
        // }));

        // const classes = useStyles();

        return (
            <div className="header">
                <div className="logo-div">
                    {/*todo*/}
                    <img className="logo" src={logo} alt={"this is avatar image"} />
                </div>
                {/* <div className="search-bar">
                    <input placeholder="search people" />
                </div> */}
                {/*<div className='profile-link'>*/}
                {/*</div>*/}
                {/* <Avatar className={classes.purple}></Avatar>  */}
                <button onClick={this.props.logout} className="nav-link btn btn-info btn-sm text-light">
                    Logout
                </button>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
});
export default connect(mapStateToProps, { logout })(Header);
