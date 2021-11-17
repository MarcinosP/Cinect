import "../styles/Profile.css";
import Header from "../components/layout/Header";
import Navbar from "../components/layout/Navbar";
import React, { useEffect, useState } from "react";
import Watched from "../components/layout/Profile/Watched";
// import {Api} from "../apiHandler/apiHandler";
import ProfileInfo from "../components/layout/Profile/ProfileInfo";
import ProfilePreferences from "../components/layout/Profile/ProfilePreferences";
import Sidebar from "../components/layout/Sidebar";
// import Cookies from "universal-cookie";

const Profile = () => {
    const [state, setState] = useState({
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
        // const cookies = new Cookies();
        //add user Details
        // Api.showUserInfo(cookies.get('user')).then(response => {
        //     return response.data;
        // }).then(data => {
        //     console.log(data['name']);
        //     setState(prevState => ({
        //         name: data['name'],
        //         id: 0,
        //         surname: data['surname'],
        //         nationality: data['nationality'],
        //         languages: data['languages'],
        //         dateOfBirth: data['dateOfBirth'].date.split(' ')[0],
        //         timeMovies: data['wtm'],
        //         timeSeries: data['wts']
        //     }))
        // })
        //     .catch(error => {
        //         console.error(error);
        //     })
        // // add watched movies
        // Api.getWatchedMoviesByUser(cookies.get('user')).then(response => {
        //     console.log(response.data);
        //     for (const responseElement of response.data) {
        //         console.log(responseElement);
        //         setWatchedList(prevState => (
        //             {
        //                 watched: [...prevState.watched, responseElement]
        //             }
        //         ))
        //     }
        // })
        // // add watched series
        // Api.getWatchedSeriesByUser(cookies.get('user')).then(response => {
        //     console.log(response.data);
        //     for (const responseElement of response.data) {
        //         console.log(responseElement);
        //         setWatchedList(prevState => (
        //             {
        //                 watched: [...prevState.watched, responseElement]
        //             }
        //         ))
        //     }
        // })
    }, []);

    return (
        <>
            <Header />
            <div className="content">
                <Sidebar />
                <div className="profile">
                    <div className="info">
                        <ProfileInfo
                            name={state.name + " " + state.surname}
                            dateOfBirth={state.dateOfBirth}
                            nationality={state.nationality}
                            languages={state.languages}
                        />
                        <ProfilePreferences timeMovies={state.timeMovies} timeSeries={state.timeSeries} />
                    </div>

                    <div onClick={() => console.log(watchedList)} className="watched">
                        <div className="text-lower1">viewing history</div>
                        <div className="watched-list">
                            {watchedList.watched.map((watched, key) => {
                                return (
                                    <Watched
                                        key={key}
                                        date={watched.watchedAtDate.date.split(" ")[0]}
                                        title={watched.title}
                                        rating={watched.userRating}
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

export default Profile;
