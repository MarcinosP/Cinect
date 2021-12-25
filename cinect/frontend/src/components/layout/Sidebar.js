import { ProSidebar, SidebarFooter, Menu, MenuItem, SubMenu, SidebarContent, SidebarHeader } from "react-pro-sidebar";
import { FiUsers, FiArrowRightCircle, FiArrowLeftCircle } from "react-icons/fi";
import { BiCameraMovie, BiLogOutCircle } from "react-icons/bi";
import { GiHamburgerMenu, GiBookshelf } from "react-icons/gi";
import { HiOutlineUserAdd } from "react-icons/hi";
import "react-pro-sidebar/dist/css/styles.css";
import { RiMovieLine } from "react-icons/ri";
import { FiSettings } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { FaImdb } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.scss";

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState({ imdb: false, cinect: false });

    useEffect(() => {
        window.location.href.includes("movies") ? setIsOpen({ ...isOpen, cinect: true }) : null;
        window.location.href.includes("series") ? setIsOpen({ ...isOpen, cinect: true }) : null;
        window.location.href.includes("serie-imdb") ? setIsOpen({ ...isOpen, imdb: true }) : null;
        window.location.href.includes("movie-imdb") ? setIsOpen({ ...isOpen, imdb: true }) : null;
    }, []);

    return (
        <div className="navbar">
            <ProSidebar>
                <SidebarContent>
                    <Menu iconShape="circle">
                        <MenuItem icon={<CgProfile />}>
                            Profile
                            <Link to="/" />
                        </MenuItem>
                        <MenuItem icon={<HiOutlineUserAdd />} active={window.location.href.includes("all_users") ? true : false}>
                            Add friends
                            <Link to="/all_users" />
                        </MenuItem>
                        <MenuItem icon={<FiUsers />} active={window.location.href.includes("friend_list") ? true : false}>
                            Friend list
                            <Link to="/friend_list" />
                        </MenuItem>
                        <SubMenu
                            open={isOpen.imdb}
                            onOpenChange={() => {
                                setIsOpen({ ...isOpen, imdb: !isOpen.imdb });
                            }}
                            title="IMDB database"
                            icon={<FaImdb />}
                        >
                            <MenuItem icon={<RiMovieLine />} active={window.location.href.includes("movie-imdb") ? true : false}>
                                Movies
                                <Link to="/movie-imdb" />
                            </MenuItem>
                            <MenuItem icon={<BiCameraMovie />} active={window.location.href.includes("serie-imdb") ? true : false}>
                                Series
                                <Link to="/serie-imdb" />
                            </MenuItem>
                        </SubMenu>
                        <SubMenu
                            open={isOpen.cinect}
                            onOpenChange={() => {
                                setIsOpen({ ...isOpen, cinect: !isOpen.cinect });
                            }}
                            title="Cinect database"
                            icon={<GiBookshelf />}
                        >
                            <MenuItem icon={<RiMovieLine />} active={window.location.href.includes("movies") ? true : false}>
                                Movies
                                <Link to="/movies" />
                            </MenuItem>
                            <MenuItem icon={<BiCameraMovie />} active={window.location.href.includes("series") ? true : false}>
                                Series
                                <Link to="/series" />
                            </MenuItem>
                        </SubMenu>
                    </Menu>
                </SidebarContent>
                <SidebarFooter>
                    <Menu>
                        <MenuItem icon={<FiSettings />} active={window.location.href.includes("settings") ? true : false}>
                            Settings
                            <Link to="/settings " />
                        </MenuItem>
                    </Menu>
                </SidebarFooter>
            </ProSidebar>
        </div>
    );
}
