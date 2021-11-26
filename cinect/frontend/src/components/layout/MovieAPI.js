import Rating from "@material-ui/lab/Rating";
import "./Movie.css";
import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Cookies from "universal-cookie";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";

const MovieAPI = (props) => {
    //snackbar

    const [open, setOpen] = React.useState(false);
    const [isClicked, setIsClicked] = useState(false);
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
        // const cookies = new Cookies();
        // console.log(props.id + " " + ratingNew);
        // Api.addWatchedMoviesByUser(cookies.get('user'), props.id, ratingNew).then(response => {
        //     setOpen(true);
        //     console.log(response);
        // }).catch(error => {
        //     console.log(error)
        // })
        console.log("XD");
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
            <div className="movie-component">
                {/* {isClicked ?  */}

                <div
                    onClick={() => {
                        setIsClicked(!isClicked);
                    }}
                >
                    <div className="movie-component-content">
                        <div className={"text-lower"}>Title</div>
                        <div className={"text-higher"}>{props.title}</div>
                    </div>
                </div>

                {/* <Modal
                    open={isClicked}
                    onClose={handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <div style={useStyles} className={classes.paper}>
                        <h2 id="simple-modal-title">Text in a modal</h2>
                        <p id="simple-modal-description">Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
                        
                    </div>
                </Modal> */}

                {/* :
                        <div>
                            <div className={"movie-component-after"}>
                                <div className={"text-lower"}>
                                    Add {props.title} to watched list!
                                </div>
                                <div className={"text-higher"}>
                                    rate movie:
                                </div>
                                <StyledRating onChange={(event, value) => {
                                    setRatingNew(value)
                                }} precision={1}/>
                                <div className={"text-lower"}>
                                    Confirm?
                                </div>
                                <div>
                                    <StyledAccept onClick={addWatchedMovie}><TiTick/></StyledAccept>
                                    <StyledDecline onClick={() => {
                                        setIsClicked(!isClicked)
                                    }}><ImCross/></StyledDecline>
                                </div>

                            </div>
                        </div>} */}
            </div>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    movie was added Successfully!
                </Alert>
            </Snackbar>
        </>
    );
};

export default MovieAPI;
