import React, { useState, useEffect } from "react";

export default function FindPeople() {
    const [newUsers, setNewUsers] = useState([]);

    useEffect(() => {
        console.log("useEffect (setNewUsers) start");

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
        </div>
    );
}
