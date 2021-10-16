import "./Header.css"
import React, {useEffect, useState} from 'react';
import logo from ".././img/logo.png";
import {makeStyles} from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import {deepPurple} from '@material-ui/core/colors';
import {Link} from "react-router-dom";
import NavbarMobile from "./NavbarMobile";
import Cookies from "universal-cookie";
import {Api} from "../apiHandler/apiHandler";

const Header = () => {

    const [state,setState] = useState({name:""});

    useEffect(() => {
        const cookies = new Cookies();
        //add user Details
        Api.showUserInfo(cookies.get('user')).then(response => {
            return response.data;
        }).then(data => {
            setState(prevState => ({
                name: data['name'],
            }))
        })
            .catch(error => {
                console.error(error);
            })

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
                {/*todo*/}
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
