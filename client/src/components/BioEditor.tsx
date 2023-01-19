import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

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
                    <h3>{props.userBio}</h3>
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
                        <label htmlFor="bioFiled">Tell us about you:</label>
                        <br />
                        <textarea
                            name="bioFiled"
                            onChange={props.handleBioChange}
                            value={props.userBio}
                        ></textarea>
                    </div>
                    <Button variant="outline-primary" type="submit" onClick={onSubmit}>
                        Save Bio
                    </Button>
                </div>
            )}
        </div>
    );
}
