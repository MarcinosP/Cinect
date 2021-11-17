import React, { Fragment } from "react";
import Form from "./Form";
import Leads from "./Leads";
// import Navbar from "./../layout/Navbar/Navbar";
import Header from "../layout/Header";

export default function Dashboard() {
    return (
        <>
            <Header />
            {/* <Navbar /> */}
            <Form />
            <Leads />
        </>
    );
}
