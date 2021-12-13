import InputAdornment from "@material-ui/core/InputAdornment";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Rating from "@material-ui/lab/Rating";
import Modal from "@material-ui/core/Modal";
import { GoInfo } from "react-icons/go";
import { AiOutlinePlus } from "react-icons/ai";
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

const CssMovieTextField = withStyles({
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

const CssSeriesTextField = withStyles({
    root: {
        "& label.Mui-focused": {
            color: "#C263AC",
        },
        "& label.Mui": {
            color: "#C263AC",
        },
        "& .MuiInput-underline:after": {
            borderBottomColor: "#C263AC",
        },
        "& input": {
            color: "white",
        },
        "& label": {
            color: "white",
        },
        "& .MuiOutlinedInput-root": {
            "& fieldset": {
                borderColor: "#C263AC",
            },
            "&:hover fieldset": {
                borderColor: "#C263AC",
            },
            "&.Mui-focused fieldset": {
                borderColor: "#C263AC0",
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
    const [modalStyle] = useState(getModalStyle);
    const [newObject, setNewObject] = useState({
        title: "",
        length: 0,
        created_at: "2020-01-01",
        image: "",
    });
    const [open, setOpen] = useState(false);

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
        if (e.target.name == "image") {
            setNewObject({ ...newObject, [e.target.name]: e.target.files[0] });
        } else {
            setNewObject({ ...newObject, [e.target.name]: e.target.value });
        }
    };

    const StyledMovieAccept = withStyles({
        text: {
            color: "#8cfac4",
            fontSize: "1em",
        },
    })(Button);

    const StyledSeriesAccept = withStyles({
        text: {
            color: "#C263AC",
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
        let formData = new FormData();

        formData.append("image", newObject.image);
        formData.append("title", newObject.title);
        formData.append("length", newObject.length);
        formData.append("created_at", newObject.created_at);

        if (props.isMovie == true) {
            formData.append("is_movie", true);
            axios.post(`api/movie-series-cinect`, formData, config).then((response) => {
                props.getData();
                setOpen(false);
            });
        } else {
            formData.append("is_series", true);
            axios.post(`api/movie-series-cinect`, formData, config).then((response) => {
                props.getData();
                setOpen(false);
            });
        }
    };

    return (
        <>
            <div>
                {props.isMovie == true ? "Add movie" : "Add series"}
                <AiOutlinePlus style={{ marginLeft: "5px" }} onClick={handleOpen} />
            </div>
            <Modal open={open} onClose={handleClose} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
                <div style={modalStyle} className={classes.paper}>
                    <div className="add-movie-series">
                        {props.isMovie ? (
                            <>
                                <div> Add movie</div>
                                <>
                                    image:
                                    <input
                                        onChange={handleChangeNewObject}
                                        type="file"
                                        name="image"
                                        accept="image/png, image/gif, image/jpeg"
                                    />
                                </>
                                <CssMovieTextField
                                    onChange={handleChangeNewObject}
                                    value={newObject.title}
                                    id="outlined-basic"
                                    label="Title"
                                    name="title"
                                    variant="outlined"
                                />
                                <CssMovieTextField
                                    onChange={handleChangeNewObject}
                                    value={newObject.length}
                                    id="outlined-basic"
                                    label="Length"
                                    name="length"
                                    type="number"
                                    variant="outlined"
                                    className={classes.outlinedInput}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">Minutes:</InputAdornment>,
                                    }}
                                />
                                <CssMovieTextField
                                    onChange={handleChangeNewObject}
                                    value={newObject.created_at}
                                    id="outlined-basic"
                                    variant="outlined"
                                    label="Creation date"
                                    name="created_at"
                                    type="date"
                                />
                                <div>
                                    <StyledMovieAccept onClick={handleCreate}>Create movie</StyledMovieAccept>
                                </div>
                            </>
                        ) : (
                            <>
                                <div> Add series</div>
                                <>
                                    image:
                                    <input
                                        onChange={handleChangeNewObject}
                                        type="file"
                                        name="image"
                                        accept="image/png, image/gif, image/jpeg"
                                    />
                                </>
                                <CssSeriesTextField
                                    onChange={handleChangeNewObject}
                                    value={newObject.title}
                                    id="outlined-basic"
                                    label="Title"
                                    name="title"
                                    variant="outlined"
                                />
                                <CssSeriesTextField
                                    onChange={handleChangeNewObject}
                                    value={newObject.length}
                                    id="outlined-basic"
                                    label="Length"
                                    name="length"
                                    type="number"
                                    variant="outlined"
                                    className={classes.outlinedInput}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">Minutes:</InputAdornment>,
                                    }}
                                />
                                <CssSeriesTextField
                                    onChange={handleChangeNewObject}
                                    value={newObject.created_at}
                                    id="outlined-basic"
                                    variant="outlined"
                                    label="Creation date"
                                    name="created_at"
                                    type="date"
                                />
                                <div>
                                    <StyledSeriesAccept onClick={handleCreate}>Create series</StyledSeriesAccept>
                                </div>
                            </>
                        )}
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
