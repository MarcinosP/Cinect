import { withStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import Button from "@material-ui/core/Button";
import MuiAlert from "@material-ui/lab/Alert";
import Rating from "@material-ui/lab/Rating";
import { ImCross } from "react-icons/im";
import Cookies from "universal-cookie";
import { TiTick } from "react-icons/ti";
import React, { useState } from "react";
import "./Movie.css";
import { connect } from "react-redux";
import axios from "axios";

const Movie = (props) => {
    //snackbar

    const [open, setOpen] = React.useState(false);
    const [isClicked, setIsClicked] = useState(true);
    const [ratingNew, setRatingNew] = useState(-1);

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };
    //snackbar
    const StyledRating = withStyles({
        iconFilled: {
            color: "#8cfac4",
        },
        iconHover: {
            color: "#25F690",
        },
    })(Rating);
    const StyledAccept = withStyles({
        text: {
            color: "#8cfac4",
            fontSize: "2em",
        },
    })(Button);
    const StyledDecline = withStyles({
        text: {
            color: "#A3270C",
            fontSize: "1.4em",
        },
    })(Button);

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const addWatchedMovie = () => {
        console.log("XD");
    };

    return (
        <>
            <div className="movie-component">
                {isClicked ? (
                    <div
                        onClick={() => {
                            setIsClicked(!isClicked);
                        }}
                    >
                        <img className="movie-photo" src={props.image} alt={"this is cool image"} />

                        <div className="movie-component-content">
                            <div className={"text-lower"}>Title</div>
                            <div className={"text-higher"}>{props.title}</div>
                            <div className={"text-lower"}>Creation date</div>
                            <div className={"text-higher"}>{props.date != undefined ? props.date.split("T")[0] : props.date}</div>
                            <div className={"text-lower"}>Average rate</div>
                            <StyledRating value={props.rating} readOnly precision={1} />
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className={"movie-component-after"}>
                            <div className={"text-lower"}>Add {props.title} to watched list!</div>
                            <div className={"text-higher"}>rate movie:</div>
                            <StyledRating
                                onChange={(event, value) => {
                                    setRatingNew(value);
                                }}
                                precision={1}
                            />
                            <div className={"text-lower"}>Confirm?</div>
                            <div>
                                <StyledAccept onClick={addWatchedMovie}>
                                    <TiTick />
                                </StyledAccept>
                                <StyledDecline
                                    onClick={() => {
                                        setIsClicked(!isClicked);
                                    }}
                                >
                                    <ImCross />
                                </StyledDecline>
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

export default connect(mapStateToProps, null)(Movie);
