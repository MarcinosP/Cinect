import "../styles/Profile.css";
import Header from "../components/layout/Header";
import React, { useEffect, useState } from "react";
import Watched from "../components/layout/Profile/Watched";
// import {Api} from "../apiHandler/apiHandler";
import ProfileInfo from "../components/layout/Profile/ProfileInfo";
import ProfilePreferences from "../components/layout/Profile/ProfilePreferences";
import Sidebar from "../components/layout/Sidebar";
// import Cookies from "universal-cookie";
import { connect } from "react-redux";
import axios from "axios";

const Profile = (props) => {
    const [userData, setUserData] = useState({
        name: "",
        surname: "",
        nationality: "",
        languages: "",
        dateOfBirth: "",
        timeMovies: "",
        timeSeries: "",
    });

    useEffect(() => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Token "+props.token
            },
        };
        // console.log(tokenConfig);
        axios.get(`api/auth/user-details/${props.user.id}`, config).then(response=>{
            console.log(response)
            setUserData(response.data[0])
        })
    }, []);

    return (
        <>
            <Header />
            <div className="content">
                <Sidebar />
                <div className="profile">
                    <div className="info">
                        <ProfileInfo
                            name={userData.name + " " + userData.surname}
                            dateOfBirth={userData.date_of_birth}
                            nationality={userData.nationality}
                            languages={userData.languages}
                        />
                        <ProfilePreferences timeMovies={userData.timeMovies} timeSeries={userData.timeSeries} />
                    </div>

                    <div onClick={() => console.log(userData)} className="watched">
                        <div className="text-lower1">viewing history</div>
                        <div className="watched-list">
                            {/* {watchedList.watched.map((watched, key) => {
                                return (
                                    <Watched
                                        key={key}
                                        date={watched.watchedAtDate.date.split(" ")[0]}
                                        title={watched.title}
                                        rating={watched.userRating}
                                    />
                                );
                            })} */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const mapStateToProps = (state) => ({
    user: state.auth.user,
    token: state.auth.token
});

export default connect(mapStateToProps, null)(Profile);