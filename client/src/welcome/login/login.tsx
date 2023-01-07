import { Component, FormEvent } from "react";
import { redirect, Link } from "react-router-dom";
import { ValidationErr } from "../../components/validation-err";

interface LoginState {
    email?: string;
    password?: string;
    error: boolean;
}

export class Login extends Component<any, any> {
    // need fix any type with boolean
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            error: false,
        };
    }

    handleInputChange = (evt) => {
        const property = evt.target.name; // will hold 'firstname' when input for firstname is changed
        // will update firstname prop dynamically in this.state variable
        this.setState({ [property]: evt.target.value });
    };

    handleSubmit = (evt: FormEvent) => {
        evt.preventDefault();

        // make POST request with fetch
        fetch("/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
            }),
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log("Success: ", data);
                if (!data.validation) {
                    // alert("Something went wrong. Please try again!");
                    this.setState({ error: true });
                    return;
                }

                this.setState({ error: false });
                // return redirect("/");
                location.reload();
            })
            .catch((err) => {
                console.log("Reg error: ", err);
            });
    };

    render() {
        console.log("state: ", this.state);
        return (
            <div>
                <p>Please Login:</p>
                {this.state.error && <ValidationErr />}
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <span>Email</span>
                        <input name="email" onChange={this.handleInputChange} />
                    </div>
                    <div>
                        <span>Password</span>
                        <input
                            name="password"
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <button>Login</button>
                </form>
                <Link to="/">Click here to Register!</Link>
                <br />
                <Link to="/reset">Click here to Reset password!</Link>
            </div>
        );
    }
}
