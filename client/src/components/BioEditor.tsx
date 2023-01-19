import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

export default function BioEditor(props) {
    const [showEditField, setShowEditField] = useState(false);
    // console.log("showEditField: ", showEditField);
    // console.log("props: ", props);

    const toggleEditShow = (event) => {
        event.preventDefault();
        setShowEditField((showEditField) => !showEditField);
    };

    const onSubmit = (event) => {
        toggleEditShow(event);
        props.handleSubmitBio(event);
    };

    return (
        <div className="user-bio">
            {props.userBio && !showEditField && (
                <div>
                    <h2>Your Bio:</h2>
                    <h4>{props.userBio}</h4>
                    <Button
                        variant="outline-primary"
                        type="submit"
                        onClick={toggleEditShow}
                    >
                        Edit Bio
                    </Button>
                </div>
            )}
            {!props.userBio && !showEditField && (
                <div>
                    <h2>Add your Bio:</h2>
                    <Button
                        variant="outline-primary"
                        type="submit"
                        onClick={toggleEditShow}
                    >
                        Add Bio
                    </Button>
                </div>
            )}
            {showEditField && (
                <div>
                    <div>
                        {/* <label htmlFor="bioFiled">Tell us about you:</label> */}
                        <br />
                        <FloatingLabel
                            controlId="floatingTextarea2"
                            label="Tell us about you:"
                        >
                            <Form.Control
                                as="textarea"
                                placeholder="Leave your bio here"
                                style={{ height: "100px" }}
                                onChange={props.handleBioChange}
                                value={props.userBio}
                            />
                        </FloatingLabel>
                        {/* <textarea
                            name="bioFiled"
                            onChange={props.handleBioChange}
                            value={props.userBio}
                        ></textarea> */}
                    </div>
                    <br />
                    <Button
                        variant="outline-primary"
                        type="submit"
                        onClick={onSubmit}
                    >
                        Save Bio
                    </Button>
                </div>
            )}
        </div>
    );
}
