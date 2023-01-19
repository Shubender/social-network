import { Component, FormEvent } from "react";
import { redirect, Link } from "react-router-dom";
import ValidationErr from "../../components/validation-err";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";

interface RegistrationState {
    firstname?: string;
    lastname?: string;
    email?: string;
    password?: string;
    error: boolean;
}

export default class Registration extends Component<any, any> {
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
                    this.setState({ error: true });
                }
                location.replace("/");
            })
            .catch((err) => {
                console.log("Reg error: ", err);
            });
    };

    render() {
        console.log("state: ", this.state);
        return (
            <div>
                <span>Please Register:</span>
                {this.state.error && <ValidationErr />}
                <div>
                    <Container>
                        <Row className="vh-80 d-flex justify-content-center align-items-center">
                            <Col md={8} lg={6} xs={12}>
                                <Card className="shadow px-4">
                                    <Card.Body>
                                        <div className="mb-3 mt-md-4">
                                            <div className="mb-3">
                                                <Form>
                                                    <Form.Group
                                                        className="mb-3"
                                                        controlId="Name"
                                                    >
                                                        <Form.Label className="text-center">
                                                            Name
                                                        </Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="Enter Name"
                                                        />
                                                    </Form.Group>

                                                    <Form.Group
                                                        className="mb-3"
                                                        controlId="formBasicEmail"
                                                    >
                                                        <Form.Label className="text-center">
                                                            Email address
                                                        </Form.Label>
                                                        <Form.Control
                                                            type="email"
                                                            placeholder="Enter email"
                                                        />
                                                    </Form.Group>

                                                    <Form.Group
                                                        className="mb-3"
                                                        controlId="formBasicPassword"
                                                    >
                                                        <Form.Label>
                                                            Password
                                                        </Form.Label>
                                                        <Form.Control
                                                            type="password"
                                                            placeholder="Password"
                                                        />
                                                    </Form.Group>
                                                    {/* <Form.Group
                                                        className="mb-3"
                                                        controlId="formBasicPassword"
                                                    >
                                                        <Form.Label>
                                                            Confirm Password
                                                        </Form.Label>
                                                        <Form.Control
                                                            type="password"
                                                            placeholder="Password"
                                                        />
                                                    </Form.Group> */}
                                                    <Form.Group
                                                        className="mb-3"
                                                        controlId="formBasicCheckbox"
                                                    ></Form.Group>
                                                    <div className="d-grid">
                                                        <Button
                                                            variant="primary"
                                                            type="submit"
                                                        >
                                                            Create Account
                                                        </Button>
                                                    </div>
                                                </Form>
                                                <div className="mt-3">
                                                    <p className="mb-0  text-center">
                                                        Already have an
                                                        account??{" "}
                                                        <a
                                                            href="{''}"
                                                            className="text-primary fw-bold"
                                                        >
                                                            Sign In
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
                <br />
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
