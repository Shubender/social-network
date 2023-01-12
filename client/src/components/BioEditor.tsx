import React, { useState } from "react";

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
                    <h1>{props.userBio}</h1>
                    <button className="btn" onClick={toggleEditShow}>
                        Edit Bio
                    </button>
                </div>
            )}

            {!props.userBio && !showEditField && (
                <div>
                    <h2>Add your Bio:</h2>
                    <button className="btn" onClick={toggleEditShow}>
                        Add Bio
                    </button>
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
                    <button type="submit" className="btn" onClick={onSubmit}>
                        Save Bio
                    </button>
                </div>
            )}
        </div>
    );
}
