// import { useNavigate } from "react-router";

export default function Logo() {
    // const navigate = useNavigate();

    // const redirect = (event) => {
    //     event.preventDefault();
    //     navigate("/");
    //     return;
    // };

    return (
        <img
            src="/olympics.jpg"
            alt="Logo"
            className="logo"
            // onClick={redirect}
        />
    );
}
