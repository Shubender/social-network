import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import ProfilePic from "../components/ProfilePic";
import FriendButton from "../components/FriendButton";

export default function OtherProfile(props) {
    const [user, setUser] = useState<any>({});
    const { id } = useParams();
    console.log("otherProfile ID: ", id);

    const navigate = useNavigate();

    // if (props.userId && +props.userId === +id) {
    //     navigate("/");
    //     return;
    // }

    useEffect(() => {
        console.log("useEffect (OtherProfile) start");

        fetch(`/api/user/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("otherProfile: ", data.userData[0]);
                setUser(data.userData[0]);
            })
            .catch((err) => {
                console.log("otherProfile error: ", err);
            });
    }, [id]);

    return (
        <div className="other-profile">
            <ProfilePic
                togglePopup={null}
                username={user?.firstname}
                imgFromApp={user?.imageurl}
                // changeName={this.changeName}
            />
            <FriendButton />

            <h2>
                {user?.firstname} {user?.lastname}
            </h2>
            <span>{user.userbio || "No bio yet"}</span>
        </div>
    );
}
