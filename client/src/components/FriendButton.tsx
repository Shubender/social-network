import { useParams } from "react-router";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";

export default function FriendButton(props) {
    const [btnState, setBtnState] = useState("Default");
    // const friendId = useParams().id;
    const friendId = props.id;

    useEffect(() => {
        fetch(`/api/friendship/${friendId}`, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((data) => {
                // console.log("fetch friendship: ", data.friendshipStatus[0]);
                // console.log("sender ID: ", data.userId);
                // console.log("recipient ID: ", friendId);

                if (data.friendshipStatus.length === 0) {
                    setBtnState("Request friendship");
                } else if (
                    !data.friendshipStatus[0].accepted &&
                    data.userId === data.friendshipStatus[0].sender_id
                ) {
                    setBtnState("Cancel my request");
                } else if (
                    data.friendshipStatus[0].accepted === false &&
                    data.userId !== data.friendshipStatus[0].sender_id
                ) {
                    setBtnState("Accept request");
                } else if (data.friendshipStatus[0].accepted == true) {
                    setBtnState("Unfriend");
                }
            });
    }, [friendId]);

    function onClick(event) {
        event.preventDefault();

        if (btnState === "Request friendship") {
            fetch(`/friendship/${friendId}`, {
                method: "POST",
            })
                .then((res) => res.json())
                .then(() => {
                    setBtnState("Cancel my request");
                    window.location.reload();
                });
        } else if (
            btnState === "Cancel my request" ||
            btnState === "Unfriend"
        ) {
            fetch(`/friendship/cancel/${friendId}`, {
                method: "POST",
            })
                .then((res) => res.json())
                .then(() => {
                    setBtnState("Request friendship");
                    window.location.reload();
                });
        } else if (btnState === "Accept request") {
            fetch(`/friendship/accept/${friendId}`, {
                method: "POST",
            })
                .then((res) => res.json())
                .then(() => {
                    setBtnState("Request friendship");
                    window.location.reload();
                });
        }
    }

    return (
        <Button
            variant="outline-primary"
            type="submit"
            className="m-3"
            onClick={onClick}
        >
            {btnState}
        </Button>
    );
}
