import React, { useEffect, useState } from "react";
import Header from "../components/layout/Header";
import "../styles/AllUsers.css";
import User from "../components/layout/AllUsers/User";
import { FaExchangeAlt } from "react-icons/fa";
import Approve from "../components/layout/AllUsers/Approve";
import Sidebar from "../components/layout/Sidebar";
// import Cookies from "universal-cookie";
import { connect } from "react-redux";
import axios from "axios";
const AllUsers = (props) => {
    const [users, setUsers] = useState([]);
    const [toApprove, setToApprove] = useState([]);
    const [display, setDisplay] = useState(true);
    const [toPrint, setToPrint] = useState([]);

    useEffect(() => {
        refreshParent();
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

    const refreshParent = () => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Token " + props.token,
            },
        };

        axios.get(`api/auth/all-users`, config).then((response) => {
            setUsers(response.data[0]);
        });
        axios.get("api/friend-list", config).then((response) => {
            const listToApprove = response.data.filter((e) => e.confirmed == false);
            setToApprove(listToApprove);
        });
    };

    return (
        <>
            <Header />
            <div className="content">
                <Sidebar />
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
                            {users.map((user, key) => {
                                return <User id={user.id} name={user.name} surname={user.surname} />;
                            })}
                        </div>
                    ) : (
                        <div className={"users-list"}>
                            {toApprove.map((user, key) => {
                                return <Approve name={user.name} surname={user.surname} id={user.id} refreshParent={refreshParent}/>;
                            })}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

const mapStateToProps = (state) => ({
    user: state.auth.user,
    token: state.auth.token,
});

export default connect(mapStateToProps, null)(AllUsers);
