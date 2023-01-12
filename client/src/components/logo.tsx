import { Navigate } from "react-router";


export default function Logo() {
    
    // not work
//     const redirect = () => {
//         return <Navigate to="/" />;
//     };

    return (
        <img
            src="olympics.jpg"
            alt="Logo"
            className="logo"
            // onClick={redirect}
        />
    );
}