import React from "react";
import Header from "../components/layout/Header";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

const Settings = () => {
    return (
        <>
            <Header />
            <div className="content">
                <Sidebar />
            </div>
        </>
    );
};

export default Settings;
