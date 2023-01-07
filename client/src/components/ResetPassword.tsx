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
                // Make a Post request to server and check if the user exists
                console.log("switch case 1 shoot");

                fetch("/reset", {
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
                        console.log("Success: ", data);
                        if (!data.validation) {
                            this.setState({ error: true });
                            return;
                        }

                        this.setState({ error: false, step: 2 });
                        // this.setState({ step: 2 });
                    })
                    .catch((err) => {
                        console.log("Reg error: ", err);
                    });
                break;
            case 2:
                this.setState({ step: 3 });
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
                return <h1>Step 2</h1>;
            case 3:
                return <h1>Step 3</h1>;

            default:
                break;
        }
    }

    render() {
        console.log("state: ", this.state);
        return <div>{this.whatToRender()}</div>;
    }
}
