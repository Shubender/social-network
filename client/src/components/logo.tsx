export default function Logo() {
    const redirect = (event) => {
        event.preventDefault();
        location.assign("/");
        return;
    };

    return (
        <img
            src="/olympics.jpg"
            alt="Logo"
            className="logo"
            onClick={redirect}
        />
    );
}
