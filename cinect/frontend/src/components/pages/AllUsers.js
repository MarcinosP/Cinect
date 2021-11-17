import React, { useEffect, useState } from "react";
import Header from "../layout/Header";
import Navbar from "../layout/Navbar";
import "../../styles/AllUsers.css";
// import {Api} from "../apiHandler/apiHandler";
import User from "../layout/AllUsers/User";
import { FaExchangeAlt } from "react-icons/fa";
import Approve from "../layout/AllUsers/Approve";
// import Cookies from "universal-cookie";

const AllUsers = () => {
    const [users, setUsers] = useState([]);
    const [toApprove, setToApprove] = useState([]);
    const [display, setDisplay] = useState(true);
    const [toPrint, setToPrint] = useState([]);

    useEffect(() => {
        // Api.getAllUsers().then(response => {
        //     setUsers(response.data);
        //     setToPrint(response.data);
        // })
        // const cookies = new Cookies();
        // Api.getUserFriendRequests(cookies.get('user')).then(response => {
        //     setToApprove(response.data);
        // })
    }, []);

    const handleSearch = (event) => {
        if (event.target.value === "") {
            setToPrint(users);
        } else {
            const regex = new RegExp("^" + event.target.value, "i");
            const tmp = users.filter((user) => regex.test(user.name));
            setToPrint(tmp);
        }
    };

    return (
        <>
            <Header />
            <div className="content">
                <Navbar />
                <div className="all-users">
                    <div className="all-users-search">
                        <div className="all-users-search-filter">{display ? <>All Users</> : <> Friend List Requests</>}</div>

                        <FaExchangeAlt
                            onClick={() => {
                                setDisplay(!display);
                            }}
                        />
                        <div className="all-users-search-bar">
                            <input onChange={handleSearch} placeholder="search people" />
                        </div>
                    </div>
                    {display ? (
                        <div className={"users-list"}>
                            {toPrint.map((user, key) => {
                                return <User id={user.id} name={user.name} surname={user.surname} />;
                            })}
                        </div>
                    ) : (
                        <div className={"users-list"}>
                            {toApprove.map((user, key) => {
                                return <Approve name={user.senderName} surname={user.senderSurname} id={user.senderId} />;
                            })}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default AllUsers;
