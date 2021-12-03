import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Rating from "@material-ui/lab/Rating";
import Modal from "@material-ui/core/Modal";
import { GoInfo } from "react-icons/go";
import { GrAdd } from "react-icons/gr";
import { TiTick } from "react-icons/ti";
import { connect } from "react-redux";
import "./ModalAddMovieSeries.scss";
import axios from "axios";

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

function ModalAddMovieSeries(props) {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = useState(getModalStyle);
    const [newObject, setNewObject] = useState({
        title: "",
        length: 0,
        date: "2020-01-01",
    });
    const [open, setOpen] = useState(false);
    const [imdbInfo, setImdbInfo] = useState({});

    const handleOpen = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChangeNewObject = (e) => {
        e.preventDefault();
        setNewObject({ ...newObject, [e.target.name]: e.target.value });
    };

    const StyledAccept = withStyles({
        text: {
            color: "#8cfac4",
            fontSize: "1em",
        },
    })(Button);

    const handleCreate = (e) => {
        e.preventDefault();
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Token " + props.token,
            },
        };
        if (props.isMovie == true) {
            axios.post(`api/movie-series-cinect`, { ...newObject, is_movie: true }, config).then((response) => {
                console.log(response);
            });
        } else {
            axios.post(`api/movie-series-cinect`, { ...newObject, is_series: true }, config).then((response) => {
                console.log(response);
            });
        }
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
                            onChange={handleChangeNewObject}
                            value={newObject.title}
                            id="outlined-basic"
                            label="Title"
                            name="title"
                            variant="outlined"
                        />
                        <CssTextField
                            onChange={handleChangeNewObject}
                            value={newObject.length}
                            id="outlined-basic"
                            label="Length"
                            name="length"
                            type="number"
                            variant="outlined"
                        />
                        <CssTextField
                            onChange={handleChangeNewObject}
                            value={newObject.date}
                            id="outlined-basic"
                            variant="outlined"
                            label="Creation date"
                            name="date"
                            type="date"
                        />
                        <div>
                            <StyledAccept onClick={handleCreate}>Create movie</StyledAccept>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    token: state.auth.token,
});

export default connect(mapStateToProps, null)(ModalAddMovieSeries);
