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
    const userId = useSelector((store) => {
        console.log("store: ", store.friends?.userId);
        return store.friends?.userId;
    });
    console.log("userId: ", userId);

    console.log("friendships: ", friendships);
    const { friends } = friendships ?? { friends: [] };
    console.log("friends: ", friends);

    // const wannabees = friends.filter((f) => !f.accepted);
    // const accepted = friends.filter((f) => f.accepted);
    // console.log("wannabees: ", wannabees);
    // console.log("friends: ", accepted);

    useEffect(() => {
        fetch("/api/friends/")
            .then((res) => res.json())
            .then((data) => {
                console.log("Data in friends: ", data);
                dispatch(getFriendships(data));
            });
    }, []);

    return (
        <div>
            <div>
                <h3>Want friendship:</h3>
                <div className="users-list">
                    {friendships?.friends?.length &&
                        friendships.friends.map(
                            (user) =>
                                !user.accepted && (
                                    <Card
                                        key={user.id}
                                        style={{ width: "15rem" }}
                                    >
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
                                            <Card.Text>
                                                {user.userbio}
                                            </Card.Text>
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
                    {friendships?.friends?.length &&
                        friendships.friends.map(
                            (user) =>
                                user.accepted &&
                                user.id !== friendships?.userId && (
                                    //
                                    <Card
                                        key={user.id}
                                        style={{ width: "15rem" }}
                                    >
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
                                            <Card.Text>
                                                {user.userbio}
                                            </Card.Text>
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
