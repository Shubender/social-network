import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

export default class Uploader extends Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        // console.log("uploader mounted!");
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.props.handleSubmitUpload}>
                    <Form.Group controlId="formFile" className="m-3 w-25">
                        <Form.Label>Upload your avatar here:</Form.Label>
                        <Form.Control
                            type="file"
                            name="file"
                            accept="image/*"
                            onChange={this.props.handleFileChange}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="m-3">
                        Upload
                    </Button>
                </Form>
            </div>
        );
        // Here you will need to create a form to send a image file, just like in the Image Board
    }
}
