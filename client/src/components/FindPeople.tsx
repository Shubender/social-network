import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function FindPeople() {
    const [newUsers, setNewUsers] = useState([]);

    useEffect(() => {
        // console.log("useEffect (setNewUsers) start");

        fetch("/newUsers")
            .then((res) => res.json())
            .then((data) => {
                console.log("newUsers: ", data.newUsers);
                setNewUsers(data.newUsers);
            })
            .catch((err) => {
                console.log("setNewUsers error: ", err);
            });
    }, []);

    const [searchUsers, setSearchUsers] = useState("");
    const [foundUsers, setFoundUsers] = useState([]);

    useEffect(() => {
        // console.log("useEffect (setSearchUsers) start");

        fetch("/searchUsers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ search: searchUsers }),
        })
            .then((res) => res.json())
            .then((data) => {
                setFoundUsers(data.foundUsers);
                // console.log("foundUsers: ", foundUsers);
            })
            .catch((err) => {
                console.log("setFoundUsers error: ", err);
            });
    }, [searchUsers]);

    return (
        <div>
            <h2>Find People</h2>
            <div>
                <h3>Currently joined:</h3>
                <div className="users-list">
                    {newUsers.map((user) => (
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
                    ))}
                </div>
            </div>

            <div>
                {/* <h3>Find user by name:</h3> */}
                <Form>
                    <Form.Group
                        className="m-3 w-25"
                        controlId="exampleForm.ControlInput1"
                    >
                        <Form.Label>Find user by name:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Search"
                            onChange={(event) =>
                                setSearchUsers(event.target.value)
                            }
                            value={searchUsers}
                        />
                    </Form.Group>
                </Form>
                {/* <input
                    type="text"
                    onChange={(event) => setSearchUsers(event.target.value)}
                    value={searchUsers}
                /> */}
                <br />
                <br />
                {foundUsers.length !== 0 && (
                    <div className="users-list">
                        {foundUsers.map((user) => (
                            <Card key={user.id} className="user-card">
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
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
