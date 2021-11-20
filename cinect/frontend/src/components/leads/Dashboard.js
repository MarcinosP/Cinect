import React, { Fragment } from "react";
import Form from "./Form";
import Leads from "./Leads";
import Header from "../layout/Header";

export default function Dashboard() {
    return (
        <>
            <Header />
            <Form />
            <Leads />
        </>
    );
}
