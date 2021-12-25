import { GrFacebookOption, GrGoogle, GrInstagram, GrSnapchat } from "react-icons/gr";
import ModalChangeAvatar from "../../accounts/ModalChangeAvatar";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { BiEditAlt } from "react-icons/bi";
import React from "react";

const ProfileInfo = (props) => {
    return (
        <div className="info-user-container">
            <div className={"edit-profile"}>
                <div className="text-lower1">profile info</div>
            </div>
            <div className="info-user">
                <div className="info-photo">
                    <ModalChangeAvatar avatar={props.avatar} id={props.id} capitalLeter={props.name[0]} />
                </div>
                <div className="text-lower">Name Surname</div>
                <div className="text-info-higher">{props.name}</div>
                <div className="text-lower">Date of birth</div>
                <div className="text-info-higher">
                    {props.dateOfBirth != undefined ? props.dateOfBirth.split("T")[0] : props.dateOfBirth}
                </div>
                <div className="text-lower">Nationality</div>
                <div className="text-info-higher">{props.nationality}</div>
                <div className="text-lower">Languages</div>
                <div className="text-info-higher">{props.languages}</div>
                <div className="social-media">
                    <GrFacebookOption />
                    <GrSnapchat />
                    <GrInstagram />
                    <GrGoogle />
                </div>
            </div>
        </div>
    );
};

export default ProfileInfo;
