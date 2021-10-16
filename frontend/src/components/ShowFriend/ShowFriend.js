import "../../styles/Profile.css"
import Header from "../Header";
import Navbar from "../Navbar";
import React, {useEffect, useState} from 'react';
import Watched from "../Profile/Watched";
import {Api} from "../../apiHandler/apiHandler";
import FriendInfo from "./FriendInfo";
import FriendPreferences from "./FriendPreferences";
import {useParams} from "react-router";

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
        console.log(id);
        Api.showUserInfo(id).then(response => {
            console.log(id);
            return response.data;

        }).then(data => {
            console.log(data);
            setFriend(prevState => ({
                name: data['name'],
                id: data['id'],
                surname: data['surname'],
                nationality: data['nationality'],
                languages: data['languages'],
                dateOfBirth: data['dateOfBirth'].date.split(' ')[0],
                timeMovies: data['wtm'],
                timeSeries: data['wts']
            }))
        })
            .catch(error => {
                console.error(error);
            })

        // add watched movies
        Api.getWatchedMoviesByUser(id).then(response => {
            console.log(response.data);
            for (const responseElement of response.data) {
                console.log(responseElement);
                setWatchedList(prevState => (
                    {
                        watched: [...prevState.watched, responseElement]
                    }
                ))
            }
        })

        // add watched series
        Api.getWatchedSeriesByUser(id).then(response => {
            console.log(response.data);
            for (const responseElement of response.data) {
                console.log(responseElement);
                setWatchedList(prevState => (
                    {
                        watched: [...prevState.watched, responseElement]
                    }
                ))
            }
        })
    }, [])

    return (
        <>
            <Header/>
            <div className='content'>
                <Navbar/>
                <div className='profile'>
                    <div className='info' onClick={() => {
                        console.log(friend.name + " " + friend.surname)
                    }}>
                        <FriendInfo name={friend.name + " " + friend.surname} dateOfBirth={friend.dateOfBirth}
                                    nationality={friend.nationality} languages={friend.languages}/>
                        <FriendPreferences timeMovies={friend.timeMovies} timeSeries={friend.timeSeries}/>
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


export default ShowFriend;

