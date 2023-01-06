import { Registration } from "./registration/registration";
import { Login } from "./login/login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Logo } from "../components/logo";

export function Welcome() {
    return (
        <div>
            <h1>
                Welcome to <br /> MY SOCIAL NETWORK
            </h1>
            <Logo />
            <div>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Registration />}></Route>
                        <Route path="/login" element={<Login />}></Route>
                    </Routes>
                </BrowserRouter>
            </div>
        </div>
    );
}
