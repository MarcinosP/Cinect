import Rating from '@material-ui/lab/Rating';
import {withStyles} from '@material-ui/core/styles';
import "./Serie.css"
import React, {useState} from 'react';
import Button from "@material-ui/core/Button";
import {TiTick} from "react-icons/ti";
import {ImCross} from "react-icons/im";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from '@material-ui/lab/Alert';
import {Api} from "../apiHandler/apiHandler";
import Cookies from "universal-cookie";

const Serie = (props) => {
    const [open, setOpen] = React.useState(false);
    const [isClicked, setIsClicked] = useState(true);
    const [ratingNew, setRatingNew] = useState(-1);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;

        }
        setOpen(false);
    };

    const StyledRating = withStyles({
        iconFilled: {
            color: '#ff6d75',
        },
        iconHover: {
            color: '#ff3d47',
        },
    })(Rating);

    const StyledAccept = withStyles({
        text: {
            color: '#ff6d75',
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

    const addWatchedSeries = () => {
        const cookies = new Cookies();
        console.log(props.id + " " + ratingNew);
        Api.addWatchedSeriesByUser(cookies.get('user'), props.id, ratingNew).then(() => {
                setOpen(true);
            }
        ).catch(error => {
            console.log(error);
        })
    }

    return (
        <>
            <div className="serie-component">
                {isClicked ? <div onClick={() => {
                        setIsClicked(!isClicked)
                    }}>

                        <img className='serie-photo' src={require("../img/series/" + props.title + ".jpg")}
                             alt={"this is cool image"}/>

                        <div className="serie-component-content">
                            <div className={"text-lower"}>
                                Title
                            </div>
                            <div className={"text-higher-series"}>
                                {props.title}
                            </div>
                            <div className={"text-lower"}>
                                Creation date
                            </div>
                            <div className={"text-higher-series"}>
                                {props.date}
                            </div>
                            <div className={"text-lower"}>
                                Average rate
                            </div>
                            <StyledRating value={props.rating} readOnly precision={1}/>
                        </div>
                    </div> :
                    <div>
                        <div className={"series-component-after"}>
                            <div className={"text-lower"}>
                                Add {props.title} to watched list!
                            </div>
                            <div className={"text-higher-series"}>
                                rate movie:
                            </div>
                            <StyledRating onChange={(event, value) => {
                                setRatingNew(value)
                            }} precision={1}/>
                            <div className={"text-lower"}>
                                Confirm?
                            </div>
                            <div>
                                <StyledAccept onClick={addWatchedSeries}><TiTick/></StyledAccept>
                                <StyledDecline onClick={() => {
                                    setIsClicked(!isClicked)
                                }}><ImCross/></StyledDecline>
                            </div>

                        </div>
                    </div>}
            </div>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    movie was added Successfully!
                </Alert>
            </Snackbar>
        </>
    );
};

export default Serie;
