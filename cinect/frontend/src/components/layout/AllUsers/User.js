import { makeStyles, withStyles } from "@material-ui/core/styles";
import React, { useState, useEffect } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Button from "@material-ui/core/Button";
import MuiAlert from "@material-ui/lab/Alert";
import Avatar from "@material-ui/core/Avatar";
import { ImCross } from "react-icons/im";
import { TiTick } from "react-icons/ti";
import { connect } from "react-redux";
import axios from "axios";
import "./User.css";

const User = (props) => {
    const [open, setOpen] = useState(false);
    const [display, setDisplay] = useState(true);

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
        },
    }));
    const classes = useStyles();

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };

    const addFriend = () => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Token " + props.token,
            },
        };
        axios.post("api/friend-list", { user_requested: props.id }, config).then((response) => {});
    };

    return (
        <>
            {display ? (
                <div
                    onClick={() => {
                        setDisplay(!display);
                    }}
                    className={"user-display"}
                >
                    <Avatar id={"avatar-user" + props.id} className={classes.orange} src={"http://localhost:8000/media/" + props.avatar}>
                        {props.name == null ? props.name : props.name[0]}
                    </Avatar>
                    <div className={"text-lower-user"}>{props.name}</div>
                    <div className={"text-lower-user"}>{props.surname}</div>
                </div>
            ) : (
                <div className={"user-query"}>
                    <div className={"text-lower"}>Send friend request to {props.name + " " + props.surname}?</div>
                    <div className={"user-buttons"}>
                        <StyledAccept onClick={addFriend}>
                            <TiTick />
                        </StyledAccept>
                        <StyledDecline
                            onClick={() => {
                                setDisplay(!display);
                            }}
                        >
                            <ImCross />
                        </StyledDecline>
                    </div>
                </div>
            )}
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    friend request was send to {props.name + " " + props.surname}
                </Alert>
            </Snackbar>
        </>
    );
};

const mapStateToProps = (state) => ({
    user: state.auth.user,
    token: state.auth.token,
});

export default connect(mapStateToProps, null)(User);
