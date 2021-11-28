import React, { useEffect, useState, useRef, useCallback } from "react";
import useSearchSeries from "../customHooks/useSearchSeries";
import useDebounce from "../customHooks/useDebounce";
import SerieAPI from "../components/layout/SerieAPI";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import "../styles/AddSeries.css";
import axios from "axios";

const AddSeriesIMDB = () => {
    const [query, setQuery] = useState("");
    const [pageNumber, setPageNumber] = useState(1);
    const debounceValue = useDebounce(query, 500);

    const { series , hasMore, loading, error } = useSearchSeries(debounceValue, pageNumber);

    const observer = useRef();
    const lastSeriesElementRef = useCallback(
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
                <div className="series-container">
                    <div className="series-search">
                        <div className="series-search-filter">Series</div>
                        <div className="series-search-bar">
                            <input onChange={handleSearch} placeholder="search series" />
                        </div>
                    </div>
                    <div className="series-list">
                    <>
                            {series.map((serie, key) => {
                                if (series.length === key + 1) {
                                    return (
                                        <div ref={lastSeriesElementRef} key={key}>
                                            <SerieAPI key={key} id={serie.imdb_id} date={"no"} title={serie.title} rating={1} />
                                        </div>
                                    );
                                } else {
                                    return <SerieAPI key={key} id={serie.imdb_id} date={"no"} title={serie.title} rating={1} />;
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

export default AddSeriesIMDB;
