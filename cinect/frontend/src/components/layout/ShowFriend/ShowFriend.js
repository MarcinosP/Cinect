import FriendPreferences from "./FriendPreferences";
import React, { useEffect, useState } from "react";
import Watched from "../Profile/Watched";
import { useParams } from "react-router";
import { connect } from "react-redux";
import FriendInfo from "./FriendInfo";
import "../../../styles/Profile.css";
import Sidebar from "../Sidebar";
import Header from "../Header";
import axios from "axios";

const ShowFriend = (props) => {
    let { id } = useParams();
    const [watched, setWatched] = useState([]);
    const [friend, setFriend] = useState({
        name: "",
        id: 0,
        surname: "",
        nationality: "",
        languages: "",
        dateOfBirth: "",
        timeMovies: "",
        timeSeries: "",
    });

    const [watchedList, setWatchedList] = useState({ watched: [] });

    useEffect(() => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Token " + props.token,
            },
        };

        axios.get(`api/get-watched/${id}`, config).then((r) => {
            setWatched(r.data);
        });

        axios.get(`api/auth/user-details/${id}`, config).then((response) => {
            setFriend(response.data[0]);
        });
    }, []);

    return (
        <>
            <Header />
            <div className="content">
                <Sidebar />
                <div className="profile">
                    <div
                        className="info"
                    >
                        <FriendInfo
                            name={friend.name + " " + friend.surname}
                            dateOfBirth={friend.date_of_birth}
                            nationality={friend.nationality}
                            languages={friend.languages}
                        />
                        <FriendPreferences timeMovies={friend.watched_time_movies} timeSeries={friend.watched_time_series} />
                    </div>

                    <div className="watched">
                        <div className="text-lower1">viewing history</div>
                        <div className="watched-list">
                            {watched.map((w, key) => {
                                return (
                                    <Watched
                                        key={key}
                                        date={w?.user_detalis?.watched_at}
                                        title={w?.info?.title}
                                        rating={w?.user_detalis?.rating}
                                    />
                                );
                            })}
                        </div>
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

export default connect(mapStateToProps, null)(ShowFriend);
