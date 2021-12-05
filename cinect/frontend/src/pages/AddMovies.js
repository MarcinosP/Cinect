import { GrAdd } from "react-icons/gr";
import React, { useEffect, useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import Movie from "../components/layout/Movie";
import { withRouter } from "react-router";
import "../styles/AddMovies.css";
import axios from "axios";
import ModalAddMovieSeries from "../components/layout/ModalAddMovieSeries";
import { connect } from "react-redux";

const AddMovies = (props) => {
    const [movies, setMovies] = useState([]);

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

        axios.get(`api/movie-series-cinect`, config, { is_movie: true }).then((response) => {
            setMovies(response.data);
        });
    };

    return (
        <div>
            <Header />
            <div className="content">
                <Sidebar />
                <div className="movies-container">
                    <div className="movies-search">
                        <div className="movies-search-filter">
                            <ModalAddMovieSeries isMovie={true} />
                        </div>
                    </div>
                    <div className="movies-list">
                        {movies.map((movie, key) => {
                            return <Movie key={key} id={key} image={movie.image} date={movie.date} title={movie.title} rating={movie.rating} />;
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    user: state.auth.user,
    token: state.auth.token,
});

export default withRouter(connect(mapStateToProps, null)(AddMovies));
