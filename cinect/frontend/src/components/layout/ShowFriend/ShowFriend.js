import FriendPreferences from "./FriendPreferences";
import React, {useEffect, useState} from 'react';
import Watched from "../Profile/Watched";
import {useParams} from "react-router";
import { connect } from "react-redux";
import FriendInfo from "./FriendInfo";
import "../../../styles/Profile.css"
import Sidebar from "../Sidebar";
import Header from "../Header";
import axios from "axios";


const ShowFriend = (props) => {
    let {id} = useParams();
    const [friend, setFriend] = useState({
        name: '',
        id: 0,
        surname: '',
        nationality: '',
        languages: '',
        dateOfBirth: '',
        timeMovies: '',
        timeSeries: ''
    });

    const [watchedList, setWatchedList] = useState({watched: []})

    useEffect(() => {
        // console.log(id);
        // Api.showUserInfo(id).then(response => {
        //     console.log(id);
        //     return response.data;

        // }).then(data => {
        //     console.log(data);
        //     setFriend(prevState => ({
        //         name: data['name'],
        //         id: data['id'],
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
        // Api.getWatchedMoviesByUser(id).then(response => {
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
        // Api.getWatchedSeriesByUser(id).then(response => {
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
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Token " + props.token,
            },
        };
        axios.get(`api/auth/user-details/${id}`, config).then((response) => {
            console.log(response.data)
            setFriend(response.data[0]);
        });
    }, [])

    return (
        <>
            <Header/>
            <div className='content'>
                <Sidebar/>
                <div className='profile'>
                    <div className='info' onClick={() => {
                        console.log(friend.name + " " + friend.surname)
                    }}>
                        <FriendInfo name={friend.name + " " + friend.surname} dateOfBirth={friend.date_of_birth}
                                    nationality={friend.nationality} languages={friend.languages}/>
                        <FriendPreferences timeMovies={friend.watched_time_movies} timeSeries={friend.watched_time_series}/>
                    </div>

                    <div onClick={() => console.log(watchedList)} className='watched'>
                        <div className='text-lower1'>
                            viewing history
                        </div>
                        <div className='watched-list'>
                            {watchedList.watched.map((watched, key) => {
                                return <Watched key={key} date={watched.watchedAtDate.date.split(' ')[0]}
                                                title={watched.title} rating={watched.userRating}/>
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