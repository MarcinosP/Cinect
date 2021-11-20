import { ProSidebar, SidebarFooter, Menu, MenuItem, SubMenu, SidebarContent, SidebarHeader } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { BiCameraMovie, BiLogOutCircle } from "react-icons/bi";
import { RiMovieLine } from "react-icons/ri";
import { FiUsers, FiArrowRightCircle, FiArrowLeftCircle } from "react-icons/fi";
import { HiOutlineUserAdd } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";
import { FiSettings } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
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
                        <MenuItem icon={<HiOutlineUserAdd />}>
                            Add friends
                            <Link to="/all_users" />
                        </MenuItem>
                        <MenuItem icon={<FiUsers />}>
                            Friend list
                            <Link to="/friend_list" />
                        </MenuItem>
                        <MenuItem icon={<RiMovieLine />}>
                            Movies
                            <Link to="/movies" />
                        </MenuItem>
                        <MenuItem icon={<BiCameraMovie />}>
                            Series
                            <Link to="/series" />
                        </MenuItem>
                    </Menu>
                </SidebarContent>
                <SidebarFooter>
                    <Menu>
                        <MenuItem icon={<FiSettings />}>
                            Settings
                            <Link to="/settings " />
                        </MenuItem>
                    </Menu>
                </SidebarFooter>
            </ProSidebar>
        </div>
    );
}
