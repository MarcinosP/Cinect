import React, { useState, useRef, useCallback, useEffect } from "react";
import useSearchMovies from "../customHooks/useSearchMovies";
import MovieAPI from "../components/layout/MovieAPI";
import useDebounce from "../customHooks/useDebounce";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import { FiFilter } from "react-icons/fi";
import { withRouter } from "react-router";
import "../styles/AddMovies.css";

import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 120,
        color: "white",
        borderColor: "white",
    },
    colorWhite: {
        color: "white",
        borderColor: "#F1802D",
    },
}));

const AddMoviesIMDB = () => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const [genres, setGenres] = useState([]);
    const [query, setQuery] = useState({
        byTitle: "",
        byYear: "",
        byRating: true,
        byPopularity: false,
        byGenre: "",
        bySearchInput: "",
    });

    const debounceValue = useDebounce(query, 500);
    const { movies, hasMore, loading, error } = useSearchMovies(debounceValue, pageNumber);
    const classes = useStyles();
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

    useEffect(() => {
        getGeneres();
    }, []);

    const getGeneres = async () => {
        const options = {
            method: "GET",
            url: "https://data-imdb1.p.rapidapi.com/genres/",
            headers: {
                "x-rapidapi-host": "data-imdb1.p.rapidapi.com",
                "x-rapidapi-key": "660967386fmsh651b062d09a33c4p19cd73jsn494fc351a8b8",
            },
        };

        await axios
            .request(options)
            .then(function (response) {
                setGenres(response.data.results);
            })
            .catch(function (error) {
                console.error(error);
            });
    };

    const handleSearch = (e) => {
        const initState = {
            byYear: "",
            byRating: false,
            byPopularity: false,
            byGenre: "",
            bySearchInput: "",
        };
        setQuery({ ...initState, [e.target.name]: e.target.value });
        setPageNumber(1);
    };

    const handleFilter = (e) => {
        const initState = {
            byTitle: false,
            byYear: false,
            byRating: false,
            byPopularity: false,
            byGenre: "",
            bySearchInput: "",
        };
        setPageNumber(1);
        setQuery({ ...initState, [e.target.name]: true });
    };

    return (
        <div>
            <Header />
            <div className="content">
                <Sidebar />
                <div className="movies-container">
                    <div className="movies-search">
                        <div className="movies-search-filter">
                            <FiFilter onClick={() => setIsFilterOpen(!isFilterOpen)} />
                        </div>
                        <div className="movies-search-bar">
                            <input name="bySearchInput" value={query.bySearchInput} onChange={handleSearch} placeholder="search movies" />
                        </div>
                    </div>
                    <div className="movies-list">
                        <>
                            {isFilterOpen ? (
                                <>
                                    <div className="movies-filter-left">
                                        <div>sort by </div>
                                        <div>
                                            by rating
                                            <button
                                                className={query.byRating ? "dotted-button-pressed" : "dotted-button"}
                                                onClick={handleFilter}
                                                name="byRating"
                                            />
                                        </div>
                                        <div>
                                            by popularity
                                            <button
                                                className={query.byPopularity ? "dotted-button-pressed" : "dotted-button"}
                                                onClick={handleFilter}
                                                name="byPopularity"
                                            />
                                        </div>
                                    </div>
                                    <div className="movies-filter-right">
                                        <div>filter</div>
                                        <div>
                                            <div>
                                                by year:
                                                <input
                                                    className="input-filter"
                                                    name="byYear"
                                                    id="byYear"
                                                    onChange={handleSearch}
                                                    placeholder="search by year"
                                                    value={query.byYear}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <FormControl className={classes.formControl}>
                                                <InputLabel className={classes.colorWhite} name="byGenre" id="byGenre">
                                                    by genre
                                                </InputLabel>
                                                <Select
                                                    name="byGenre"
                                                    id="byGenre"
                                                    value={query.byGenre}
                                                    onChange={handleSearch}
                                                    autoWidth
                                                    className={classes.colorWhite}
                                                >
                                                    {genres.map((genre, key) => {
                                                        return (
                                                            <MenuItem name={genre.genre} value={genre.genre}>
                                                                {genre.genre}
                                                            </MenuItem>
                                                        );
                                                    })}
                                                    <MenuItem value={10}>Ten</MenuItem>
                                                    <MenuItem value={20}>Twenty</MenuItem>
                                                    <MenuItem value={30}>Thirty</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <></>
                            )}
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
