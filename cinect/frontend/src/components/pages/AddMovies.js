import Header from "../layout/Header";
import Navbar from "../layout/Navbar";
import "../../styles/AddMovies.css";
import Movie from "../layout/Movie";
import { withRouter } from "react-router";
// import {withMedia} from 'react-media-query-hoc';
import React, { useEffect, useState } from "react";

const AddMovies = () => {
    const [movies, setMovies] = useState([]);
    const [toPrint, setToPrint] = useState([]);

    useEffect(() => {
        // Api.getAllMovies().then(response => {
        //     setMovies(response.data);
        //     setToPrint(response.data);
        // })
    }, []);

    const handleSearch = (event) => {
        if (event.target.value === "") {
            setToPrint(movies);
        } else {
            const regex = new RegExp("^" + event.target.value, "i");
            const tmp = movies.filter((movie) => regex.test(movie.title));
            setToPrint(tmp);
        }
    };

    return (
        <div>
            <Header />
            <div className="content">
                <Navbar />
                <div className="movies-container">
                    <div className="movies-search">
                        <div className="movies-search-filter">Movies</div>
                        <div className="movies-search-bar">
                            <input onChange={handleSearch} placeholder="search movies" />
                        </div>
                    </div>
                    <div className="movies-list">
                        {toPrint.map((movie, key) => {
                            return (
                                <Movie
                                    key={key}
                                    id={movie.id}
                                    date={movie.creationDate.date.split(" ")[0]}
                                    title={movie.title}
                                    rating={movie.userRating}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withRouter(AddMovies);
