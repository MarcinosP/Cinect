import { ProSidebar, SidebarFooter, Menu, MenuItem, SubMenu, SidebarContent, SidebarHeader } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { BiCameraMovie, BiLogOutCircle } from "react-icons/bi";
import { RiMovieLine } from "react-icons/ri";
import { FiUsers, FiArrowRightCircle, FiArrowLeftCircle } from "react-icons/fi";
import { HiOutlineUserAdd } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";
import { FiSettings } from "react-icons/fi";
import { GiHamburgerMenu, GiBookshelf } from "react-icons/gi";
import { FaImdb } from "react-icons/fa";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.scss";

export default function Sidebar() {
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
                        <SubMenu title="IMDB database" icon={<FaImdb />}>
                            <MenuItem icon={<RiMovieLine />} active={window.location.href.includes("movie-imdb") ? true : false}>
                                Movies
                                <Link to="/movie-imdb" />
                            </MenuItem>
                            <MenuItem icon={<BiCameraMovie />} active={window.location.href.includes("serie-imdb") ? true : false}>
                                Series
                                <Link to="/serie-imdb" />
                            </MenuItem>
                        </SubMenu>
                        <SubMenu title="Cinect database" icon={<GiBookshelf />}>
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
