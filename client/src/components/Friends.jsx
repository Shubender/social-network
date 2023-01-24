import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getFriendships } from "../redux/friends/slice";
import FriendButton from "../components/FriendButton";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";

// import Container from "react-bootstrap/Container";
// import Form from "react-bootstrap/Form";

export default function FindFriends() {
    const dispatch = useDispatch();

    const friendships = useSelector((store) => store.friends);
    // console.log("friendships: ", friendships);

    const userId = useSelector((store) => {
        return store.friends?.userId;
    });
    // console.log("userId: ", userId);

    const { friends } = friendships ?? { friends: [] };
    // console.log("friends: ", friends);

    const wannabees = friends?.filter(
        (f) => !f.accepted && f.sender_id != userId && f.id != userId
    );
    const accepted = friends?.filter((f) => f.accepted && f.id != userId);

    // console.log("wannabees: ", wannabees);
    // console.log("friends: ", accepted);

    useEffect(() => {
        fetch("/api/friends/")
            .then((res) => res.json())
            .then((data) => {
                // console.log("Data in friends: ", data);
                dispatch(getFriendships(data));
            });
    }, []);

    return (
        <Container>
            <div>
                <br />
                <h3>Want friendship:</h3>
                <br />
                <div className="users-list">
                    {wannabees.map((user) => (
                        <Card key={user.id} className="user-card mx-auto">
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
                                <div className="d-grid gap-2">
                                    <Link to={`/user/${user.id}`}>
                                        <Button
                                            variant="outline-primary"
                                            className="m-3"
                                            size="sm"
                                        >
                                            View profile
                                        </Button>
                                        <FriendButton id={user.id} size="sm" />
                                    </Link>
                                </div>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            </div>
            <div>
                <br />
                <h3>Your friends:</h3>
                <br />
                <div className="users-list">
                    {accepted.map((user) => (
                        <Card key={user.id} className="user-card mx-auto">
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
                                <div className="d-grid gap-2"></div>
                                <Link to={`/user/${user.id}`}>
                                    <Button
                                        variant="outline-primary"
                                        className="m-3"
                                        size="sm"
                                    >
                                        View profile
                                    </Button>
                                    <FriendButton id={user.id} size="sm" />
                                </Link>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            </div>
        </Container>
    );
}
