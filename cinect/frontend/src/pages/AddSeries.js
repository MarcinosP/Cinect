import "../styles/AddSeries.css"
import Header from "../components/layout/Header";
import Navbar from "../components/layout/Navbar";
import Serie from "../components/layout/Serie";
import React, { useEffect, useState} from 'react';
import Sidebar from "../components/layout/Sidebar";
// import {Api} from "../apiHandler/apiHandler";

const AddSeries = () => {
    const [series, setSeries] = useState([]);
    const [toPrint, setToPrint] = useState([]);

    useEffect(() => {
        // Api.getAllSeries().then(response => {
        //     setSeries(response.data);
        //     setToPrint(response.data);
        // })
    }, []);

    const handleSearch = (event) => {
        if (event.target.value === '') {
            setToPrint(series);
        } else {
            const regex = new RegExp("^" + event.target.value, "i");
            const tmp = series.filter(serie => regex.test(serie.title));
            setToPrint(tmp);
        }
    }

    return (
        <div>
            <Header/>
            <div className='content'>
                {/* <Navbar/> */}
                <Sidebar/>
                <div className="series-container">
                    <div className="series-search">
                        <div className="series-search-filter">
                            Series
                        </div>
                        <div className="series-search-bar">
                            <input onChange={handleSearch} placeholder="search series"/>
                        </div>

                    </div>
                    <div className="series-list">
                        {toPrint.map((serie, key) => {
                            return <Serie key={key} id={serie.id} date={serie.creationDate.date.split(' ')[0]}
                                          title={serie.title}
                                          rating={serie.userRating}/>
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddSeries;
