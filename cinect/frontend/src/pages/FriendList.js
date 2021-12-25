import React, { useEffect, useState } from "react";
import Header from "../components/layout/Header";
import "../styles/AllUsers.css";
import Friend from "../components/layout/ShowFriend/Friend";
import { useHistory } from "react-router";
import Sidebar from "../components/layout/Sidebar";
import { connect } from "react-redux";
// import Cookies from "universal-cookie";
import axios from "axios";

const FriendList = (props) => {
    const [users, setUsers] = useState([]);
    const [friendList, setFriendList] = useState([]);

    let history = useHistory();
    const showUserHandler = (id) => {
        history.push(`/show_friend/${id}`);
    };

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Token " + props.token,
            },
        };

        await axios.get("api/friend-list", config).then((response) => {
            const friendList = response.data.filter((e) => e.confirmed == true);
            setFriendList(friendList);
        });
    };

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
                <Sidebar />
                <div className="all-users">
                    <div className="all-users-search">
                        <div className="all-users-search-filter"></div>

                        <div className="all-users-search-bar">
                            <input onChange={handleSearch} placeholder="search people" />
                        </div>
                    </div>

                    <div className={"users-list"}>
                        {friendList.map((user, key) => {
                            return <Friend avatar ={user.avatar} name={user.name} surname={user.surname} id={user.id} handler={showUserHandler} />;
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};

const mapStateToProps = (state) => ({
    user: state.auth.user,
    token: state.auth.token,
});

export default connect(mapStateToProps, null)(FriendList);
