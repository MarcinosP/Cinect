import "../styles/AddSeries.css";
import Header from "../components/layout/Header";
import SerieAPI from "../components/layout/SerieAPI";
import React, { useEffect, useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import axios from "axios";

const AddSeriesIMDB = () => {
    const [series, setSeries] = useState([]);
    const [toPrint, setToPrint] = useState([]);

    useEffect(() => {
        const options = {
            method: "GET",
            url: "https://data-imdb1.p.rapidapi.com/series/order/byRating/",
            params: { page_size: "50" },
            headers: {
                "x-rapidapi-host": "data-imdb1.p.rapidapi.com",
                "x-rapidapi-key": "660967386fmsh651b062d09a33c4p19cd73jsn494fc351a8b8",
            },
        };

        axios
            .request(options)
            .then(function (response) {
                // console.log(response.data);
                setSeries(response.data.results);
            })
            .catch(function (error) {
                console.error(error);
            });
    }, []);

    const handleSearch = (event) => {
        // if (event.target.value === "") {
        //     setToPrint(series);
        // } else {
        //     const regex = new RegExp("^" + event.target.value, "i");
        //     const tmp = series.filter((serie) => regex.test(serie.title));
        //     setToPrint(tmp);
        // }
    };

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
                        {series.map((serie, key) => {
                            return <SerieAPI key={key} id={key} date={"no"} title={serie.title} rating={1} />;
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddSeriesIMDB;
