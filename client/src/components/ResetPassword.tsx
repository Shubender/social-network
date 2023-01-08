import { Component } from "react";
import { Link } from "react-router-dom";
import { ValidationErr } from "./validation-err";

export default class ResetPass extends Component<any, any> {
    constructor(props) {
        super(props);
        this.state = { step: 1 };
        this.whatToRender = this.whatToRender.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value,
        });
    }

    handleSubmit(evt) {
        evt.preventDefault();
        console.log("handleSubmit");

        switch (this.state.step) {
            case 1:
                // console.log("switch case 1 shoot");

                fetch("/reset/start", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email: this.state.email,
                    }),
                })
                    .then((res) => {
                        return res.json();
                    })
                    .then((data) => {
                        // console.log("Success switch 1: ", data);
                        if (!data.validation) {
                            this.setState({ error: true });
                            return;
                        }

                        this.setState({ error: false, step: 2 });
                    })
                    .catch((err) => {
                        console.log("Reset 1 error: ", err);
                    });
                break;
            case 2:
                // console.log("switch case 2 shoot");
                fetch("/reset/verify", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        code: this.state.code,
                        password: this.state.password,
                        email: this.state.email,
                    }),
                })
                    .then((res) => {
                        return res.json();
                    })
                    .then((data) => {
                        // console.log("Success (switch 2): ", data);
                        if (!data.validation) {
                            this.setState({ error: true });
                            return;
                        }

                        this.setState({ error: false, step: 3 });
                    })
                    .catch((err) => {
                        console.log("Reset 2 error: ", err);
                    });
                break;

            default:
                break;
        }
    }

    whatToRender() {
        switch (this.state.step) {
            case 1:
                return (
                    <div>
                        <h1>Reset password</h1>
                        <h2>Enter email:</h2>
                        {this.state.error && <ValidationErr />}
                        <form onSubmit={this.handleSubmit}>
                            <input name="email" onChange={this.handleChange} />
                            <br />
                            <br />
                            <button>Submit</button>
                        </form>
                    </div>
                );
            case 2:
                return (
                    <div>
                        <h1>Reset password</h1>
                        {this.state.error && <ValidationErr />}
                        <form onSubmit={this.handleSubmit}>
                            <h2>Enter the code from email:</h2>
                            <input name="code" onChange={this.handleChange} />
                            <br />
                            <h2>Enter a new password:</h2>
                            <input
                                name="password"
                                onChange={this.handleChange}
                            />
                            <br />
                            <br />
                            <button>Submit</button>
                        </form>
                    </div>
                );
            case 3:
                return (
                    <div>
                        <h1>Congratulation!</h1>
                        <h2>Your password has been successfully changed</h2>
                        <Link to="/login">Go here to Log in!</Link>
                    </div>
                );

            default:
                break;
        }
    }

    render() {
        console.log("state: ", this.state);
        return <div>{this.whatToRender()}</div>;
    }
}
