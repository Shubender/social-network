import { Component, FormEvent } from "react";
import { redirect, Link } from "react-router-dom";
import ValidationErr from "../../components/validation-err";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";

interface LoginState {
    email?: string;
    password?: string;
    error: boolean;
}

export default class Login extends Component<any, any> {
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
                location.replace("/");
            })
            .catch((err) => {
                console.log("Reg error: ", err);
            });
    };

    render() {
        console.log("state: ", this.state);
        return (
            <Container className="text-center">
                <br />
                <span>Please Login</span>
                {this.state.error && <ValidationErr />}
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group className="m-3 w-25" controlId="formBasicEmail">
                        <Form.Label>Email address:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter email"
                            name="email"
                            onChange={this.handleInputChange}
                        />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else
                            (false)
                        </Form.Text>
                    </Form.Group>

                    <Form.Group
                        className="m-3 w-25"
                        controlId="formBasicPassword"
                    >
                        <Form.Label>Password:</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={this.handleInputChange}
                        />
                    </Form.Group>
                    <div className="d-grid gap-1">
                        <Button
                            variant="outline-primary"
                            type="submit"
                            className="m-3 w-25"
                            size="sm"
                        >
                            Login
                        </Button>
                        <Link to="/">
                            <Button
                                variant="outline-info"
                                type="button"
                                className="m-3 w-25"
                                size="sm"
                            >
                                Click here to Register!
                            </Button>
                        </Link>
                        <Link to="/reset/start">
                            <Button
                                variant="outline-info"
                                type="button"
                                className="m-3 w-25"
                                size="sm"
                            >
                                Click here to Reset password!
                            </Button>
                        </Link>
                    </div>
                </Form>
                <br />
            </Container>
        );
    }
}
