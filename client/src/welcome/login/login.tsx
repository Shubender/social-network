import { Component, FormEvent } from "react";
import { redirect, Link } from "react-router-dom";
import ValidationErr from "../../components/validation-err";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";

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
            <div className="text-center">
                <br />
                <span>Please Login</span>
                <br />
                <br />
                {this.state.error && <ValidationErr />}
                <Container>
                    <Row className="vh-80 d-flex justify-content-center align-items-center">
                        <Col md={8} lg={6} xs={12}>
                            <Card className="shadow px-4">
                                <Card.Body>
                                    <div className="mb-3 mt-md-4">
                                        <div className="mb-3">
                                            <Form onSubmit={this.handleSubmit}>
                                                <Form.Group
                                                    className="mb-3"
                                                    controlId="formBasicEmail"
                                                >
                                                    <Form.Label className="text-center">
                                                        Email and Password
                                                    </Form.Label>
                                                    <Form.Control
                                                        type="email"
                                                        placeholder="Email"
                                                        name="email"
                                                        onChange={
                                                            this
                                                                .handleInputChange
                                                        }
                                                    />
                                                </Form.Group>

                                                <Form.Group
                                                    className="mb-3"
                                                    controlId="formBasicPassword"
                                                >
                                                    {/* <Form.Label>
                                                            Password
                                                        </Form.Label> */}
                                                    <Form.Control
                                                        type="password"
                                                        placeholder="Password"
                                                        name="password"
                                                        onChange={
                                                            this
                                                                .handleInputChange
                                                        }
                                                    />
                                                </Form.Group>

                                                <Form.Group
                                                    className="mb-3"
                                                    controlId="formBasicCheckbox"
                                                ></Form.Group>
                                                <div className="d-grid">
                                                    <Button
                                                        variant="primary"
                                                        type="submit"
                                                    >
                                                        Log In
                                                    </Button>
                                                </div>
                                            </Form>
                                            <div className="mt-3">
                                                <p className="mb-0  text-center">
                                                    Do not have an account?{" "}
                                                    <a
                                                        href="http://localhost:3000/"
                                                        className="text-primary fw-bold"
                                                    >
                                                        Register
                                                    </a>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}
