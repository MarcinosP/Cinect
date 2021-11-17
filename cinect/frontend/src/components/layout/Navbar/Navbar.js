import "./Navbar.css";
import { Link } from "react-router-dom";
import { BiCameraMovie, BiLogOutCircle } from "react-icons/bi";
import { RiMovieLine } from "react-icons/ri";
import { FiUsers } from "react-icons/fi";
import { HiOutlineUserAdd } from "react-icons/hi";
import React from "react";
import axios from "axios";

const Navbar = () => {
    function handleLogout() {
        axios
            .post(`/logout`)
            .then(() => {
                location.href = "/loginpage";
            })
            .catch((error) => {
                console.log("error");
            });
    }

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <div className="navbar">
                <Link to={"/all_users"} className="navbar-item">
                    <HiOutlineUserAdd />
                </Link>
                <Link to={"/friend_list"} className="navbar-item">
                    <FiUsers />
                </Link>
                <Link to={"/movies"} className="navbar-item">
                    <RiMovieLine />
                </Link>
                <Link to={"/series"} className="navbar-item">
                    <BiCameraMovie />
                </Link>
                <Link to={"/"} className="UAAAAAA">
                    <BiLogOutCircle
                        onClick={() => {
                            // const cookies = new Cookies();
                            // cookies.remove('user');
                            // location.href = '/login_page';
                            console.log("UAAAAAA");
                        }}
                    />
                </Link>
            </div>
        </>
    );
};

export default Navbar;
