import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import Modal from "@material-ui/core/Modal";
import { connect } from "react-redux";
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

function ModalChangeAvatar(props) {
    const useStyles = makeStyles((theme) => ({
        root: {
            display: "flex",
            "& > *": {
                margin: theme.spacing(1),
            },
        },
        orange: {
            color: theme.palette.getContrastText("#25A690"),
            backgroundColor: "#25A690",
            width: theme.spacing(10),
            height: theme.spacing(10),
            fontSize: "2em",
            margin: "auto",
        },
        paper: {
            position: "absolute",
            width: "50vw",
            backgroundColor: "#35363a",
            borderRadius: "1em",
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
    }));
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = useState(getModalStyle);
    const [newObject, setNewObject] = useState({
        avatar: "",
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
        setNewObject({ ...newObject, [e.target.name]: e.target.files[0] });
    };

    const StyledAccept = withStyles({
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
        formData.append("avatar", newObject.image);

        axios.post(`api/movie-series-cinect`, formData, config).then((response) => {
            console.log(response);
            // todo
        });
    };

    return (
        <>
            <Avatar onClick={handleOpen} src={props.image} className={classes.orange}>
                {" "}
                {props.capitalLeter}
            </Avatar>
            <Modal open={open} onClose={handleClose} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
                <div style={modalStyle} className={classes.paper}>
                    <div className="add-movie-series">
                        <>
                            <>
                                image:
                                <input
                                    onChange={handleChangeNewObject}
                                    type="file"
                                    name="image"
                                    accept="image/png, image/gif, image/jpeg"
                                />
                            </>
                            <div>
                                <StyledAccept onClick={handleCreate}>Change Avatar</StyledAccept>
                            </div>
                        </>
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

export default connect(mapStateToProps, null)(ModalChangeAvatar);
