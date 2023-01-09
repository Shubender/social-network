import React from "react";

    // need add imgFromApp, changeName ro function
export default function ProfilePic({ togglePopup }) {
    // console.log("PROPS in profilePic: ", props);

    // imgFromApp = imgFromApp || "/default.png";

    return (
        <>
            <button onClick={togglePopup}>Toggle Popup</button>
            {/* <button onClick={() => changeName("Spiced")}>Change Name</button> */}
        </>
    );
}
