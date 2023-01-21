import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getFriendships } from "../redux/friends/slice";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
// import Container from "react-bootstrap/Container";
// import Form from "react-bootstrap/Form";

export default function FindFriends() {
    // const [userFriends, setUserFriends] = useState([]);
    // const [userId, setUserIs] = useState([]);

    const dispatch = useDispatch();
    const friendships = useSelector((store) => store.friends);
    console.log("friendships: ", friendships);

    const wannabees = friendships.filter((f) => !f.accepted);
    const friends = friendships.filter((f) => f.accepted);
    console.log("wannabees: ", wannabees);
    console.log("friends: ", friends);

    useEffect(() => {
        if (friendships.length === 0) {
            fetch("/api/friends/")
                .then((res) => res.json())
                .then((data) => {
                    console.log("Data in friends: ", data.friends);
                    dispatch(getFriendships(data.friends));
                });
        }
    }, []);

    // useEffect(() => {
    //     console.log("useEffect (setUserFriends) start");

    //     fetch(`/api/friends/`, {
    //         method: "GET",
    //     })
    //         .then((res) => res.json())
    //         .then((data) => {
    //             console.log("fetch friendship: ", data);
    //             setUserIs(data.userId);
    //             setUserFriends(data.friends);
    //         });
    // }, []);

    return (
        <div>
            <div>
                <h3>Want friendship:</h3>
                <div className="users-list">
                    {friendships.map(
                        (user) =>
                            !user.accepted && (
                                <Card key={user.id} style={{ width: "15rem" }}>
                                    <Card.Img
                                        variant="top"
                                        src={user.imageurl}
                                        alt={user.firstname}
                                        className="big-img"
                                    />
                                    <Card.Body className="d-flex flex-column justify-content-between">
                                        <Card.Title>
                                            {user.firstname} {user.lastname}
                                        </Card.Title>
                                        <Card.Text>{user.userbio}</Card.Text>
                                        <Link to={`/user/${user.id}`}>
                                            <Button variant="outline-primary">
                                                View profile
                                            </Button>
                                        </Link>
                                    </Card.Body>
                                </Card>
                            )
                    )}
                </div>
            </div>
            <div>
                <h3>Your friends:</h3>
                <div className="users-list">
                    {friendships.map(
                        (user) =>
                            user.accepted && (
                                // user.id !== userId &&
                                <Card key={user.id} style={{ width: "15rem" }}>
                                    <Card.Img
                                        variant="top"
                                        src={user.imageurl}
                                        alt={user.firstname}
                                        className="big-img"
                                    />
                                    <Card.Body className="d-flex flex-column justify-content-between">
                                        <Card.Title>
                                            {user.firstname} {user.lastname}
                                        </Card.Title>
                                        <Card.Text>{user.userbio}</Card.Text>
                                        <Link to={`/user/${user.id}`}>
                                            <Button variant="outline-primary">
                                                View profile
                                            </Button>
                                        </Link>
                                    </Card.Body>
                                </Card>
                            )
                    )}
                </div>
            </div>
        </div>
    );
}
