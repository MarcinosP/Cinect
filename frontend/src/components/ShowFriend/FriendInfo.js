import React from 'react';
import {BiEditAlt} from "react-icons/bi";
import Avatar from "@material-ui/core/Avatar";
import {GrFacebookOption, GrGoogle, GrInstagram, GrSnapchat} from "react-icons/gr";
import {makeStyles} from "@material-ui/core/styles";

const FriendInfo = (props) => {

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

    return (
        <div className='info-user-container'>
            <div className={'edit-profile'}>
                <div className='text-lower1'>
                    profile info
                </div>
                <BiEditAlt onClick={()=>{}}/>
            </div>
            <div className='info-user'>
                <Avatar id={"info-photo"} className={classes.orange}>{props.name[0]}</Avatar>
                <div className='text-lower'>
                    Name Surname
                </div>
                <div className='text-info-higher'>
                    {props.name}
                </div>
                <div className='text-lower'>
                    DoB
                </div>
                <div className='text-info-higher'>
                    {props.dateOfBirth}
                </div>
                <div className='text-lower'>
                    Nationality
                </div>
                <div className='text-info-higher'>
                    {props.nationality}
                </div>
                <div className='text-lower'>
                    Languages
                </div>
                <div className='text-info-higher'>
                    {props.languages}
                </div>
                <div className='social-media'>
                    <GrFacebookOption/><GrSnapchat/><GrInstagram/><GrGoogle/>
                </div>
            </div>
        </div>
    );
};

export default FriendInfo;