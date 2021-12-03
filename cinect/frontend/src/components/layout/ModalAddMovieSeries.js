import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import React, { useEffect, useState } from "react";
import Rating from "@material-ui/lab/Rating";
import Modal from "@material-ui/core/Modal";
import { GoInfo } from "react-icons/go";
import { GrAdd } from "react-icons/gr";
import axios from "axios";
import "./ModalAddMovieSeries.scss";

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const CssTextField = withStyles({
    root: {
        "& label.Mui-focused": {
            color: "#25F690",
        },
        "& label.Mui": {
            color: "#25F690",
        },
        "& .MuiInput-underline:after": {
            borderBottomColor: "#25F690",
        },
        "& input": {
            color: "white",
        },
        "& label": {
            color: "white",
        },
        "& .MuiOutlinedInput-root": {
            "& fieldset": {
                borderColor: "#25a690",
            },
            "&:hover fieldset": {
                borderColor: "#25a690",
            },
            "&.Mui-focused fieldset": {
                borderColor: "#25F690",
            },
        },
    },
})(TextField);

const useStyles = makeStyles((theme) => ({
    paper: {
        position: "absolute",
        width: "50vw",
        backgroundColor: "#35363a",
        borderRadius: "1em",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function ModalAddMovieSeries(props) {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = useState(getModalStyle);
    const [newMovie, setNewMovie] = useState({
        title: "",
        length: 0,
        date: "",
    });
    const [open, setOpen] = useState(false);
    const [imdbInfo, setImdbInfo] = useState({});

    useEffect(() => {
        // if (open == true) {
        //     getMovieInfo();
        // }
    }, [open]);

    const getMovieInfo = async () => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Token " + props.token,
            },
        };

        await axios
            .post(`api/movie-series-cinect`, newMovie, config)
            .then(function (response) {
                console.log("XD")
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

    const handleChangeNewMovie = (e) => {
        setNewMovie({ ...newMovie, [e.target.name]: e.target.value });
    };

    return (
        <>
            <div>
                Add movie
                <GrAdd onClick={handleOpen} />
            </div>
            <Modal open={open} onClose={handleClose} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
                <div style={modalStyle} className={classes.paper}>
                    <div className="add-movie-series">
                        <div> Add movie </div>
                        <CssTextField
                            onChange={handleChangeNewMovie}
                            value={newMovie.title}
                            id="outlined-basic"
                            label="Title"
                            variant="outlined"
                        />
                        <CssTextField
                            onChange={handleChangeNewMovie}
                            value={newMovie.length}
                            id="outlined-basic"
                            label="Length"
                            type="number"
                            variant="outlined"
                        />
                        <CssTextField
                            onChange={handleChangeNewMovie}
                            value={newMovie.date}
                            id="outlined-basic"
                            defaultValue="2020-01-01"
                            variant="outlined"
                            label="Creation date"
                            type="date"
                        />
                    </div>
                </div>
            </Modal>
        </>
    );
}
