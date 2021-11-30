import "./Watched.css"
import Rating from '@material-ui/lab/Rating';
import React, {Component} from 'react';

const Watched = (props) => {
    return (
        <div className="watched-component">
            <div className="watched-component-content">
                <div className={"text-lower"}>
                    Watched in
                </div>
                <div className={"text-higher-watched"}>
                    {props.date != undefined ? props.date.split("T")[0] : props.date}

                </div>
                <div className={"text-lower"}>
                    Title
                </div>
                <div className={"text-higher-watched"}>
                    {props.title}
                </div><
                div className={"text-lower"}>
                my rate of film
            </div>
                <Rating name="read-only" value={props.rating} readOnly />
            </div>
        </div>
    );
};

export default Watched;
