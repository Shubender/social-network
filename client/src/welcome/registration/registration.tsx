import { Component, FormEvent } from "react";

export class Registration extends Component {
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
    };

    render() {
        console.log("state: ", this.state);
        return (
            <div>
                <h1>Welcome to MY SOCIAL NETWORK</h1>
                {/* <LogoComponent/> */}
                <p>Lorum ipsum</p>
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
                        {/* <input /> */}
                    </div>
                    <div>
                        <span>Email</span>
                        {/* <input /> */}
                    </div>
                    <div>
                        <span>Password</span>
                        {/* <input /> */}
                    </div>
                    <button>Register</button>
                </form>
                {/* link to login page with <a> tag */}
            </div>
        );
    }
}
