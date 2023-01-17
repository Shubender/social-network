import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// JUST COPY, NEED REWRITE

export default function FindFriends() {
    const [userFriends, setUserFriends] = useState([]);

    useEffect(() => {
        console.log("useEffect (setUserFriends) start");

        fetch("/newUsers") // need change!!!
            .then((res) => res.json())
            .then((data) => {
                console.log("userFriends: ", data);
                setUserFriends(data.newUsers); // need change!!!
            })
            .catch((err) => {
                console.log("setUserFriends error: ", err);
            });
    }, []);

    return (
        <div>
            <div>
                <h3>Your friends:</h3>
                <div className="new-users">
                    {userFriends.map((user) => (
                        <div key={user.id}>
                            <Link to={`/user/${user.id}`}>
                                <img src={user.imageurl} alt={user.firstname} />
                            </Link>
                            <p>
                                <Link to={`/user/${user.id}`}>
                                    {user.firstname} {user.lastname}
                                </Link>
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h3>Want friendship:</h3>
                <div className="new-users">
                    {userFriends.map((user) => (
                        <div key={user.id}>
                            <Link to={`/user/${user.id}`}>
                                <img src={user.imageurl} alt={user.firstname} />
                            </Link>
                            <p>
                                <Link to={`/user/${user.id}`}>
                                    {user.firstname} {user.lastname}
                                </Link>
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
