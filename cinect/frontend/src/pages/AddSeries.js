import ModalAddMovieSeries from "../components/layout/ModalAddMovieSeries";
import React, { useEffect, useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import Serie from "../components/layout/Serie";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import "../styles/AddSeries.css";
import axios from "axios";

const AddSeries = (props) => {
    const [series, setSeries] = useState([]);

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

        axios.get(`api/get-cinsect-series`, config).then((response) => {
            setSeries(response.data);
        });
    };

    return (
        <div>
            <Header />
            <div className="content">
                <Sidebar />
                <div className="series-container">
                    <div className="series-search">
                        <div className="series-search-filter">
                            <ModalAddMovieSeries getData={getData} />
                        </div>
                    </div>
                    <div className="series-list">
                        {series.map((serie, key) => {
                            return <Serie key={key} image={serie.image} date={serie.created_at} id={key} title={serie.title} rating={serie.rating} />;
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

export default withRouter(connect(mapStateToProps, null)(AddSeries));
