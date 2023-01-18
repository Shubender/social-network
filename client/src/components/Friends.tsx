import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// JUST COPY, NEED REWRITE

export default function FindFriends() {
    const [userFriends, setUserFriends] = useState([]);
    let userId;
    useEffect(() => {
        console.log("useEffect (setUserFriends) start");

        fetch(`/api/friends/`, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("fetch friendship: ", data);
                userId = data.userId;
                console.log("userId: ", userId);
                setUserFriends(data.friends);
            });
    }, []);

    return (
        <div>
            <div>
                <h3>Want friendship:</h3>
                <div className="new-users">
                    {userFriends.map(
                        (user) =>
                            !user.accepted && (
                                <div key={user.id}>
                                    <Link to={`/user/${user.id}`}>
                                        <img
                                            src={user.imageurl}
                                            alt={user.firstname}
                                        />
                                    </Link>
                                    <p>
                                        <Link to={`/user/${user.id}`}>
                                            {user.firstname} {user.lastname}
                                        </Link>
                                    </p>
                                </div>
                            )
                    )}
                </div>
            </div>
            <div>
                <h3>Your friends:</h3>
                <div className="new-users">
                    {userFriends.map(
                        (user) =>
                            user.accepted &&
                            user.id !== userId && (
                                <div key={user.id}>
                                    <Link to={`/user/${user.id}`}>
                                        <img
                                            src={user.imageurl}
                                            alt={user.firstname}
                                        />
                                    </Link>
                                    <p>
                                        <Link to={`/user/${user.id}`}>
                                            {user.firstname} {user.lastname}
                                        </Link>
                                    </p>
                                </div>
                            )
                    )}
                </div>
            </div>
        </div>
    );
}
