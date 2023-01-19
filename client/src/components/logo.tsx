export default function Logo() {
    const redirect = (event) => {
        event.preventDefault();
        location.assign("/");
        return;
    };

    return (
        <img
            src="/logo.png"
            alt="Logo"
            className="logo"
            onClick={redirect}
        />
    );
}
