import { GrAdd } from "react-icons/gr";
import React, { useEffect, useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import Movie from "../components/layout/Movie";
import { withRouter } from "react-router";
import "../styles/AddMovies.css";
import axios from "axios";
import ModalAddMovieSeries from "../components/layout/ModalAddMovieSeries";

const AddMovies = () => {
    const [movies, setMovies] = useState([]);
    const [toPrint, setToPrint] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setIsModalOpen(false);
    };

    useEffect(() => {
        // const options = {
        //     method: "GET",
        //     url: "https://data-imdb1.p.rapidapi.com/movie/order/byRating/",
        //     params: { page_size: "50" },
        //     headers: {
        //         "x-rapidapi-host": "data-imdb1.p.rapidapi.com",
        //         "x-rapidapi-key": "660967386fmsh651b062d09a33c4p19cd73jsn494fc351a8b8",
        //     },
        // };
        // axios
        //     .request(options)
        //     .then(function (response) {
        //         setMovies(response.data.results);
        //         console.log(response.data.results);
        //     })
        //     .catch(function (error) {
        //         console.error(error);
        //     });
        // Api.getAllMovies().then(response => {
        //     setMovies(response.data);
        //     setToPrint(response.data);
        // })
    }, []);

    const handleSearch = (event) => {
        // if (event.target.value === "") {
        //     setToPrint(movies);
        // } else {
        //     const regex = new RegExp("^" + event.target.value, "i");
        //     const tmp = movies.filter((movie) => regex.test(movie.title));
        //     setToPrint(tmp);
        // }
    };

    return (
        <div>
            <Header />
            <div className="content">
                <Sidebar />
                <div className="movies-container">
                    <div className="movies-search">
                        <div className="movies-search-filter">
                            <ModalAddMovieSeries />
                        </div>
                        <div className="movies-search-bar">
                            <input onChange={handleSearch} placeholder="search movies" />
                        </div>
                    </div>
                    <div className="movies-list">
                        {movies.map((movie, key) => {
                            return <Movie key={key} id={key} date={"no"} title={movie.title} rating={1} />;
                        })}
                        {/* {toPrint.map((movie, key) => {
                            return (
                                <Movie
                                    key={key}
                                    id={movie.id}
                                    date={movie.creationDate.date.split(" ")[0]}
                                    title={movie.title}
                                    rating={movie.userRating}
                                />
                            );
                        })} */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withRouter(AddMovies);
