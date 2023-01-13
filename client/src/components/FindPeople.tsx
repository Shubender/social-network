import React, { useState, useEffect } from "react";

export default function FindPeople() {
    const [newUsers, setNewUsers] = useState([]);

    useEffect(() => {
        // console.log("useEffect (setNewUsers) start");

        fetch("/newUsers")
            .then((res) => res.json())
            .then((data) => {
                // console.log("newUsers: ", data);
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

    console.log("foundUsers: ", foundUsers);

    return (
        <div>
            <h2>Find People</h2>
            <h3>Currently joined:</h3>
            <div className="new-users">
                {newUsers.map((user) => (
                    <div key={user.id}>
                        <img src={user.imageurl} alt={user.firstname} />
                        <p>
                            {user.firstname} {user.lastname}
                        </p>
                    </div>
                ))}
            </div>
            <h3>Find user by name:</h3>
            <input
                type="text"
                onChange={(event) => setSearchUsers(event.target.value)}
                value={searchUsers}
            />
            <br />
            <br />
            {foundUsers.length !== 0 && (
                <div className="found-users">
                    {foundUsers.map((user) => (
                        <div key={user.id}>
                            <img src={user.imageurl} alt={user.firstname} />
                            <p>
                                {user.firstname} {user.lastname}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
