import React, { useState, useEffect } from "react";

export default function FindPeople() {
    const [newUsers, setNewUsers] = useState();
    useEffect(() => {
        fetch("/newUsers")
            .then((res) => res.json())
            .then((data) => {
                console.log("newUsers: ", data);
                setNewUsers(data);
            });
    }, []);

    return (
        <div>
            <h2>Find People</h2>
            <h3>Currently joined:</h3>
            {this.newUsers.map((user) => (
                <div key={user.id}>
                    <img src={user.img} alt={user.name} />
                    {user.name}
                </div>
            ))}
        </div>
    );
}
