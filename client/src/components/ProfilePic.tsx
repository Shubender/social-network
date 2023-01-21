// need add imgFromApp, changeName to function??
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";

export default function ProfilePic({ togglePopup, username, imgFromApp, picClass }) {
    imgFromApp = imgFromApp || "/no_photo.png";

    return (
        <>
            <Image
                src={imgFromApp}
                alt={username}
                onClick={togglePopup}
                rounded
                className={picClass}
            />
            {/* <button onClick={() => changeName("Spiced")}>Change Name</button> */}
        </>
    );
}
