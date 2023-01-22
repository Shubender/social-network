import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import ProfilePic from "../components/ProfilePic";
import FriendButton from "../components/FriendButton";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function OtherProfile(props) {
    const [user, setUser] = useState<any>({});
    const { id } = useParams();
    // console.log("otherProfile ID: ", id);

    const navigate = useNavigate();

    // if (props.userId && +props.userId === +id) {
    //     navigate("/");
    //     return;
    // }

    useEffect(() => {
        // console.log("useEffect (OtherProfile) start");

        fetch(`/api/user/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                // console.log("otherProfile: ", data.userData[0]);
                setUser(data.userData[0]);
            })
            .catch((err) => {
                console.log("otherProfile error: ", err);
            });
    }, [id]);

    return (
        <div className="other-profile">
            <Container>
                <Row className="px-4 my-5">
                    <Col sm={4}>
                        <ProfilePic
                            togglePopup={null}
                            username={user?.firstname}
                            imgFromApp={user?.imageurl}
                            picClass="big-img"
                            // changeName={this.changeName}
                        />
                    </Col>
                    <Col sm={8}>
                        <h2>
                            {user?.firstname} {user?.lastname}
                        </h2>
                        <p className="bio-editor mt-4">
                            <span>{user.userbio || "No bio yet"}</span>
                        </p>
                        <FriendButton id={id} />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
