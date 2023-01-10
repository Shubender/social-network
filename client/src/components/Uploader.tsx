import React, { Component } from "react";

export default class Uploader extends Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        console.log("uploader mounted!");
    }

    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit}>
                    <h1>Upload your file here:</h1>
                    <input
                        type="file"
                        name="file"
                        accept="image/*"
                        onChange={this.props.handleFileChange}
                    />
                    <button className="btn">Upload</button>
                </form>
            </div>
        );
        // Here you will need to create a form to send a image file, just like in the Image Board
    }
}
