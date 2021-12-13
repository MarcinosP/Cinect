import React, {useState} from 'react';
import Avatar from "@material-ui/core/Avatar";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import "../AllUsers/User.css"

const Friend = (props) => {

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

        const chooseHandler = () => {
            props.handler(props.id);
        };

        return (
            <>
                <div className={'user-display'} onClick={chooseHandler}>
                    <Avatar src={"http://localhost:8000/media/" + props.avatar} id={'avatar-user'} className={classes.orange}>{props.name[0]}</Avatar>
                    <div className={'text-lower-user'}>
                        {props.name}
                    </div>
                    <div className={'text-lower-user'}>
                        {props.surname}
                    </div>
                </div>
            </>
        );
    }
;

export default Friend;