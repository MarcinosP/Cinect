import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import Rating from "@material-ui/lab/Rating";
import { ImCross } from "react-icons/im";
import React, { useState } from "react";
import SimpleModal from "./SimpleModal";
import { TiTick } from "react-icons/ti";
import Cookies from "universal-cookie";
import { connect } from "react-redux";
import axios from "axios";
import "./Serie.css";

const SerieAPI = (props) => {
    const [open, setOpen] = React.useState(false);
    const [isClicked, setIsClicked] = useState(true);
    const [ratingNew, setRatingNew] = useState(-1);

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    const StyledRating = withStyles({
        iconFilled: {
            color: "#ff6d75",
        },
        iconHover: {
            color: "#ff3d47",
        },
    })(Rating);

    const StyledAccept = withStyles({
        text: {
            color: "#ff6d75",
            fontSize: "2em",
        },
    })(Button);
    const StyledDecline = withStyles({
        text: {
            color: "#A3270C",
            fontSize: "1.4em",
        },
    })(Button);
    const StyledInfo = withStyles({
        text: {
            color: "#adadad",
            fontSize: "1.4em",
        },
    })(Button);

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const addWatchedSeries = async() => {
            const options = {
                method: "GET",
                url: `https://data-imdb1.p.rapidapi.com/series/id/${props.id}/`,
                headers: {
                    "x-rapidapi-host": "data-imdb1.p.rapidapi.com",
                    "x-rapidapi-key": "660967386fmsh651b062d09a33c4p19cd73jsn494fc351a8b8",
                },
            };

            await axios
                .request(options)
                .then(function (response1) {
                    const config = {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: "Token " + props.token,
                        },
                    };

                    const body = {
                        title: props.title,
                        rating: ratingNew,
                        foreign_id: props.id,
                        length: response1.data.results.movie_length,
                        is_series: true,
                        created_at: response1.data.results.created_at,
                        is_imdb: true,
                    };
                    console.log(response1);
                    axios.post(`api/movie-series-imdb`, body, config).then((response2) => {
                        setOpen(true);
                    });
                })
                .catch(function (error) {
                    console.error(error);
                });
        };
    const useStyles = makeStyles((theme) => ({
        paper: {
            position: "absolute",
            width: 400,
            backgroundColor: theme.palette.background.paper,
            border: "2px solid #000",
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
    }));

    return (
        <>
            <div className="serie-component">
                {isClicked ? (
                    <div
                        onClick={() => {
                            setIsClicked(!isClicked);
                        }}
                    >
                        <div className="serie-component-content">
                            <div className={"text-lower"}>Title</div>
                            <div className={"text-higher-series"}>{props.title}</div>
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className={"series-component-after"}>
                            <div className={"text-lower"}>Add {props.title} to watched list!</div>
                            <div className={"text-higher-series"}>rate movie:</div>
                            <StyledRating
                                onChange={(event, value) => {
                                    setRatingNew(value);
                                }}
                                precision={1}
                            />
                            <div className={"text-lower"}>Confirm?</div>
                            <div>
                                <StyledAccept onClick={addWatchedSeries}>
                                    <TiTick />
                                </StyledAccept>
                                <StyledDecline
                                    onClick={() => {
                                        setIsClicked(!isClicked);
                                    }}
                                >
                                    <ImCross />
                                </StyledDecline>
                                <StyledInfo>
                                    <SimpleModal type="series" id={props.id} />
                                </StyledInfo>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    movie was added Successfully!
                </Alert>
            </Snackbar>
        </>
    );
};

const mapStateToProps = (state) => ({
    user: state.auth.user,
    token: state.auth.token,
});

export default connect(mapStateToProps, null)(SerieAPI);
