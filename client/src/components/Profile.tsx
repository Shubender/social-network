import React from "react";
import ProfilePic from "../components/ProfilePic";

// need add imgFromApp, changeName to function??
export default function Profile(props) {
    return (
        <>
            <h1>Hi {props.firstname}!</h1>
            <div className="big-pic">{props.profilePicProps}</div>
        </>
    );
}
