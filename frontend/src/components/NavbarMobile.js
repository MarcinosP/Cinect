import React from 'react';
import {HiMenu, HiOutlineUserAdd} from "react-icons/hi";
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import {makeStyles} from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import "./Navbar.css";
import {Link} from "react-router-dom";
import {FiSettings, FiUsers} from "react-icons/fi";
import {RiMovieLine} from "react-icons/ri";
import {BiCameraMovie, BiUserCircle} from "react-icons/bi";
import {useHistory} from "react-router";

const NavbarMobile = () => {

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    const useStyles = makeStyles((theme) => ({
        button: {
            margin: theme.spacing(4),
            fontSize: '2em',
        },
        menuItem: {
            fontSize: '2em',
        }
    }));
    const classes = useStyles();
    const history = useHistory();

    return (
        <div className={'navbar-mobile'}>
            <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                variant="contained"
                size="large"
                className={classes.button}
                startIcon={<HiMenu className={'menu-svg'}/>}
                onClick={handleClick}
            >
            </Button>

            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem className={classes.menuItem} onClick={() => {
                    history.push("/")
                }}><BiUserCircle/></MenuItem>

                <MenuItem className={classes.menuItem} onClick={() => {
                    history.push("/all_users")
                }}><HiOutlineUserAdd/></MenuItem>

                <MenuItem className={classes.menuItem} onClick={() => {
                    history.push("/friend_list")
                }}><FiUsers/></MenuItem>

                <MenuItem className={classes.menuItem} onClick={() => {
                    history.push("/movies")
                }}><RiMovieLine/></MenuItem>

                <MenuItem className={classes.menuItem} onClick={() => {
                    history.push("/series")
                }}><BiCameraMovie/></MenuItem>

                <MenuItem className={classes.menuItem} onClick={() => {
                    history.push("/")
                }}><FiSettings/></MenuItem>

            </Menu>
        </div>
    );
};

export default NavbarMobile;
