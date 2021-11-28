import useSearchMovies from "../customHooks/useSearchMovies";
import React, { useState, useRef, useCallback } from "react";
import MovieAPI from "../components/layout/MovieAPI";
import useDebounce from "../customHooks/useDebounce";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import { withRouter } from "react-router";
import "../styles/AddMovies.css";

const AddMoviesIMDB = () => {
    const [query, setQuery] = useState("");
    const [pageNumber, setPageNumber] = useState(1);
    const debounceValue = useDebounce(query, 500);

    const { movies, hasMore, loading, error } = useSearchMovies(debounceValue, pageNumber);

    const observer = useRef();
    const lastMoviesElementRef = useCallback(
        (node) => {
            if (loading) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    setPageNumber((prevPageNumber) => prevPageNumber + 1);
                }
            });
            if (node) observer.current.observe(node);
        },
        [loading, hasMore]
    );

    function handleSearch(e) {
        setQuery(e.target.value);
        setPageNumber(1);
    }

    return (
        <div>
            <Header />
            <div className="content">
                <Sidebar />
                <div className="movies-container">
                    <div className="movies-search">
                        <div className="movies-search-filter">Movies</div>
                        <div className="movies-search-bar">
                            <input onChange={handleSearch} placeholder="search movies" />
                        </div>
                    </div>
                    <div className="movies-list">
                        <>
                            {movies.map((movie, key) => {
                                if (movies.length === key + 1) {
                                    return (
                                        <div ref={lastMoviesElementRef} key={key}>
                                            <MovieAPI key={key} id={movie.imdb_id} date={"no"} title={movie.title} rating={1} />
                                        </div>
                                    );
                                } else {
                                    return <MovieAPI key={key} id={movie.imdb_id} date={"no"} title={movie.title} rating={1} />;
                                }
                            })}
                            <div>{loading && "Loading..."}</div>
                            <div>{error && "Error"}</div>
                        </>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withRouter(AddMoviesIMDB);
