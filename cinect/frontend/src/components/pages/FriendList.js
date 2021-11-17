import React, {useEffect, useState} from 'react';
import Header from "../layout/Header";
import Navbar from "../layout/Navbar";
import "../../styles/AllUsers.css"
// import {Api} from "../apiHandler/apiHandler";
import Friend from "../layout/ShowFriend/Friend";
import {useHistory} from "react-router";
// import Cookies from "universal-cookie";


const FriendList = () => {
    const [users, setUsers] = useState([]);
    const [toPrint, setToPrint] = useState([]);

    let history = useHistory();
    const showUserHandler = (id) => {
        history.push(`/show_friend/${id}`);
    }

    useEffect(() => {
        // const cookies = new Cookies();
        // Api.getUserFriends(cookies.get('user')).then(response => {
        //     setUsers(response.data);
        //     setToPrint(response.data);
        // })
    }, []);

    const handleSearch = (event) => {
        if (event.target.value === '') {
            setToPrint(users);
        } else {
            const regex = new RegExp("^" + event.target.value, "i");
            const tmp = users.filter(user => regex.test(user.name));
            setToPrint(tmp);
        }
    }

    return (
        <>
            <Header/>
            <div className='content'>
                <Navbar/>
                <div className='all-users'>
                    <div className="all-users-search">
                        <div className="all-users-search-filter">
                            Friend List
                        </div>

                        <div className="all-users-search-bar">
                            <input onChange={handleSearch} placeholder="search people"/>
                        </div>
                    </div>

                    <div className={'users-list'}>
                        {toPrint.map((user, key) => {
                            return <Friend id={user.id} name={user.name} surname={user.surname}
                                           handler={showUserHandler}/>
                        })}
                    </div>
                </div>

            </div>
        </>
    );
};

export default FriendList;