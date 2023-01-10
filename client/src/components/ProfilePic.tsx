import React from "react";

// need add imgFromApp, changeName to function??
export default function ProfilePic({ togglePopup, username, imgFromApp }) {
    imgFromApp = imgFromApp || "/no_photo.png";

    return (
        <>
            {/* <button onClick={togglePopup}>Toggle Popup</button> */}
            <img
                className="user-photo"
                src={imgFromApp}
                alt={username}
                onClick={togglePopup}
            />
            {/* <button onClick={() => changeName("Spiced")}>Change Name</button> */}
        </>
    );
}
