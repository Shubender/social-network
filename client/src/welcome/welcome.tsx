import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Registration } from "./registration/registration";
import { Login } from "./login/login";
import { Logo } from "../components/logo";
import ResetPass from "../components/ResetPassword";

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
                        <Route path="/login" element={<Login />}></Route>
                        <Route path="/reset/start" element={<ResetPass />}></Route>
                        <Route path="/" element={<Registration />}></Route>
                    </Routes>
                </BrowserRouter>
            </div>
        </div>
    );
}
