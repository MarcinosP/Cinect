import React from 'react';
import {TiTick} from "react-icons/ti";
import {ImCross} from "react-icons/im";
import Snackbar from "@material-ui/core/Snackbar";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import MuiAlert from "@material-ui/lab/Alert";
// import {Api} from "../../apiHandler/apiHandler";
// import Cookies from "universal-cookie";

const Approve = (props) => {
    const [open, setOpen] = React.useState(false);
    const StyledAccept = withStyles({
        text: {
            color: '#8cfac5',
            fontSize: '2em'
        }
    })(Button);

    const StyledDecline = withStyles({
        text: {
            color: '#A3271C',
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
            color: theme.palette.getContrastText("#25A680"),
            backgroundColor: "#25A680",
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

    const approveFriend = () => {
        // const cookies = new Cookies();
        // Api.confirmFriendRequests(props.id, cookies.get('user')).then(response => {
        //     setOpen(true);
        //     console.log(response);
        // }).catch(error => {
        //     console.log(error)
        // })
        console.log("XD")
    }

    const deleteFriend = () => {
        // const cookies = new Cookies();
        // Api.deleteFriend(props.id, cookies.get('user')).then(response => {
        //     console.log(response);
        // }).catch(error => {
        //     console.log(error)
        // })
        console.log("XD")

    }

    return (
        <>
            <div className={'user-query'}>
                <div className={"text-lower"}>
                    Add {props.name + " " + props.surname} to friend list?
                </div>
                <div className={'user-buttons'}>
                    <StyledAccept onClick={approveFriend}><TiTick/></StyledAccept>
                    <StyledDecline onClick={deleteFriend}><ImCross/></StyledDecline>
                </div>
            </div>

            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    friend request from {props.name + " " + props.surname} was accepted
                </Alert>
            </Snackbar>
        </>
    );
};

export default Approve;