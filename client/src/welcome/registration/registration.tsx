import { Component, FormEvent } from "react";
import { redirect, Link } from "react-router-dom";
import { ValidationErr } from "../../components/validation-err";

interface RegistrationState {
    firstname?: string;
    lastname?: string;
    email?: string;
    password?: string;
    error: boolean;
}

export class Registration extends Component<any, any> {
    // need fix any type with boolean
    constructor(props) {
        super(props);
        this.state = {
            firstname: "",
            lastname: "",
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
        fetch("/registration/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                firstname: this.state.firstname,
                lastname: this.state.lastname,
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
                    // alert("Fill all Data!");
                    this.setState({ error: true });
                }
                return redirect("/login");
                // location.reload();
            })
            .catch((err) => {
                console.log("Reg error: ", err);
            });
    };

    render() {
        console.log("state: ", this.state);
        return (
            <div>
                <p>Please Register:</p>
                {this.state.error && <ValidationErr />}
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <span>Firstname</span>
                        <input
                            name="firstname"
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <div>
                        <span>Lastname</span>
                        <input
                            name="lastname"
                            onChange={this.handleInputChange}
                        />
                    </div>
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
                    <button>Register</button>
                </form>
                <Link to="/login">Click here to Log in!</Link>
            </div>
        );
    }
}
