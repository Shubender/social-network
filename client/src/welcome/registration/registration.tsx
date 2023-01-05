import { Component, FormEvent } from "react";

interface RegistrationState {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
}

export class Registration extends Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
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
                <h1>
                    Welcome to <br /> MY SOCIAL NETWORK
                </h1>
                {/* <LogoComponent/> */}
                <p>Please Register:</p>
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
                {/* link to login page with <a> tag */}
            </div>
        );
    }
}
