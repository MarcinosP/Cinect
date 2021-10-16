import React, {useState} from 'react';
import Avatar from "@material-ui/core/Avatar";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import "./User.css"
import {TiTick} from "react-icons/ti";
import {ImCross} from "react-icons/im";
import Button from "@material-ui/core/Button";
import MuiAlert from "@material-ui/lab/Alert";
import {Api} from "../../apiHandler/apiHandler";
import Snackbar from "@material-ui/core/Snackbar";
import Cookies from "universal-cookie";


const User = (props) => {
    const [open, setOpen] = React.useState(false);
    const [display, setDisplay] = useState(true);

    const StyledAccept = withStyles({
        text: {
            color: '#8cfac4',
            fontSize: '2em'
        }
    })(Button);

    const StyledDecline = withStyles({
        text: {
            color: '#A3270C',
            fontSize: '1.4em'
        }
    })(Button);

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
            '& > *': {
                margin: theme.spacing(1),
            },
        },
        orange: {
            color: theme.palette.getContrastText("#25A690"),
            backgroundColor: "#25A690",
            width: theme.spacing(10),
            height: theme.spacing(10),
            fontSize: '2em'
        },
    }));
    const classes = useStyles();

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const addFriend = () => {
        const cookies = new Cookies();
        Api.addFriend(cookies.get('user'), props.id).then(response => {
            setOpen(true);
            console.log(response);
        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <>
            {display ?
                <div onClick={() => {
                    setDisplay(!display)
                }} className={'user-display'}>
                    <Avatar id={'avatar-user'} className={classes.orange}>{props.name[0]}</Avatar>
                    <div className={'text-lower-user'}>
                        {props.name}
                    </div>
                    <div className={'text-lower-user'}>
                        {props.surname}
                    </div>
                </div>
                :
                <div className={'user-query'}>
                    <div className={"text-lower"}>
                        Send friend request to {props.name + " " + props.surname}?
                    </div>
                    <div className={'user-buttons'}>
                        <StyledAccept onClick={addFriend}><TiTick/></StyledAccept>
                        <StyledDecline onClick={() => {
                            setDisplay(!display)
                        }}><ImCross/></StyledDecline>
                    </div>
                </div>
            }
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    friend request was send to {props.name + " " + props.surname}
                </Alert>
            </Snackbar>
        </>
    );
};

export default User;