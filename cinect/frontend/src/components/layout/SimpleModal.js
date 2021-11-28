import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import Rating from "@material-ui/lab/Rating";
import Modal from "@material-ui/core/Modal";
import { GoInfo } from "react-icons/go";
import axios from "axios";
import "./Movie.css";
import "./Serie.css";

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: "absolute",
        width: "75vw",
        backgroundColor: "#36374c",
        borderRadius: "1em",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const StyledRatingMovie = withStyles({
    iconFilled: {
        color: "#8cfac4",
    },
    iconHover: {
        color: "#25F690",
    },
})(Rating);
const StyledRatingSeries = withStyles({
    iconFilled: {
        color: "#ff6d75",
    },
    iconHover: {
        color: "#ff3d47",
    },
})(Rating);

export default function SimpleModal(props) {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const [imdbInfo, setImdbInfo] = useState({});

    useEffect(() => {
        if (open == true) {
            getMovieInfo();
        }
    }, [open]);

    const getMovieInfo = async () => {
        const myUrl =
            props.type == "movie"
                ? `https://data-imdb1.p.rapidapi.com/movie/id/${props.id}/`
                : `https://data-imdb1.p.rapidapi.com/series/id/${props.id}/`;
        const options = {
            method: "GET",
            url: myUrl,
            headers: {
                "x-rapidapi-host": "data-imdb1.p.rapidapi.com",
                "x-rapidapi-key": "660967386fmsh651b062d09a33c4p19cd73jsn494fc351a8b8",
            },
        };

        await axios
            .request(options)
            .then(function (response) {
                setImdbInfo(response.data.results);
            })
            .catch(function (error) {
                console.error(error);
            });
    };

    const handleOpen = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <GoInfo onClick={handleOpen} />
            <Modal open={open} onClose={handleClose} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
                <div style={modalStyle} className={classes.paper}>
                    <div className="movie-info-component">
                        <img style={{ minHeight: "300px" }} src={imdbInfo.image_url} alt={"this is cool image"} />
                        <div className="movie-info-component-content">
                            <div className={props.type == "movie" ? "text-lower" : "text-lower-series"}>Title</div>
                            <div className={props.type == "movie" ? "text-higher" : "text-higher-series"}>{imdbInfo.title}</div>
                            <div className={props.type == "movie" ? "text-lower" : "text-lower-series"}>Creation date</div>
                            <div className={props.type == "movie" ? "text-higher" : "text-higher-series"}>{imdbInfo.release}</div>
                            <div className={props.type == "movie" ? "text-lower" : "text-lower-series"}>Average rate</div>
                            {props.type == "movie" ? (
                                <StyledRatingMovie name="hover-feedback" value={imdbInfo.rating / 2} readOnly precision={1} />
                            ) : (
                                <StyledRatingSeries name="hover-feedback" value={imdbInfo.rating / 2} readOnly precision={1} />
                            )}
                        </div>
                        <div style={{ marginLeft: "10px" }}>{imdbInfo.plot}</div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
