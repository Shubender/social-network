import React, { Component } from "react";

export default class Uploader extends Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        console.log("uploader mounted!");
    }

    handleFileChange() {
        console.log('File uploaded');
    }

    render() {
        return (
            <div>
                <h1>Hi {this.props.username}, upload your file here:</h1>
                <input type="file" name="file" accept="image/*" />
                <button className="btn" onClick={this.handleFileChange}>
                    Upload
                </button>
            </div>
        );
        // Here you will need to create a form to send a image file, just like in the Image Board
    }
}
