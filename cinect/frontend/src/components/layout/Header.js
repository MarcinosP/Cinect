// import React, { Component } from "react";
// import { Link } from "react-router-dom";
// import { connect } from "react-redux";
// import PropTypes from "prop-types";
// import { logout } from "../../actions/auth";

// export class Header extends Component {
//     static propTypes = {
//         auth: PropTypes.object.isRequired,
//         logout: PropTypes.func.isRequired,
//     };

//     render() {
//         const { isAuthenticated, user } = this.props.auth;

//         const authLinks = (
//             <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
//                 <span className="navbar-text mr-3">
//                     <strong>{user ? `Welcome ${user.username}` : ""}</strong>
//                 </span>
//                 <li className="nav-item">
//                     <button onClick={this.props.logout} className="nav-link btn btn-info btn-sm text-light">
//                         Logout
//                     </button>
//                 </li>
//             </ul>
//         );

//         const guestLinks = (
//             <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
//                 <li className="nav-item">
//                     <Link to="/register" className="nav-link">
//                         Register
//                     </Link>
//                 </li>
//                 <li className="nav-item">
//                     <Link to="/login" className="nav-link">
//                         Login
//                     </Link>
//                 </li>
//             </ul>
//         );

//         return (
//             <nav className="navbar navbar-expand-sm navbar-light bg-light w-100">
//                 <div className="container">
//                     <button
//                         className="navbar-toggler"
//                         type="button"
//                         data-toggle="collapse"
//                         data-target="#navbarTogglerDemo01"
//                         aria-controls="navbarTogglerDemo01"
//                         aria-expanded="false"
//                         aria-label="Toggle navigation"
//                     >
//                         <span className="navbar-toggler-icon" />
//                     </button>
//                     <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
//                         <a className="navbar-brand" href="#">
//                             Cinect
//                         </a>
//                     </div>
//                     {isAuthenticated ? authLinks : guestLinks}
//                 </div>
//             </nav>
//         );
//     }
// }

// const mapStateToProps = (state) => ({
//     auth: state.auth,
// });

// export default connect(mapStateToProps, { logout })(Header);


import "./Header.css"
import React, {useEffect, useState} from 'react';
import logo from "../../img/logo.png";
import {makeStyles} from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import {deepPurple} from '@material-ui/core/colors';
import {Link} from "react-router-dom";
import NavbarMobile from "./NavbarMobile";
import Cookies from "universal-cookie";
// import {Api} from "../apiHandler/apiHandler";

const Header = () => {

    const [state,setState] = useState({name:""});

    useEffect(() => {
        // const cookies = new Cookies();
        // //add user Details
        // Api.showUserInfo(cookies.get('user')).then(response => {
        //     return response.data;
        // }).then(data => {
        //     setState(prevState => ({
        //         name: data['name'],
        //     }))
        // })
        //     .catch(error => {
        //         console.error(error);
        //     })
        console.log("XD")

    }, [])


    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
            '& > *': {
                margin: theme.spacing(1),
            },
        },
        purple: {
            color: theme.palette.getContrastText(deepPurple[500]),
            backgroundColor: deepPurple['A400'],
            width: theme.spacing(5),
            height: theme.spacing(5),
            fontSize: '0.6',
            margin: 'auto'
        },
    }));

    const classes = useStyles();
    return (
        <div className='header'>
            <div className='logo-div'>
                <img className="logo" src={logo} alt={"this is avatar image"}/>
            </div>
            <div className='search-bar'>
                <input placeholder="search people"/>
            </div>
            <NavbarMobile/>
            {/*<div className='profile-link'>*/}
            {/*</div>*/}
            <Link to={"/"} className={'header-link'}><Avatar className={classes.purple}>{state.name[0]}</Avatar></Link>
        </div>
    );
};

export default Header;

