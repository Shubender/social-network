import { Component } from "react";
import { Logo } from "../components/logo";
import ProfilePic from "../components/ProfilePic";
import Uploader from "../components/Uploader";

export class App extends Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            isPopupOpen: false,
            username: "Mint",
        };
        this.togglePopup = this.togglePopup.bind(this);
        // this.changeName = this.changeName.bind(this);
    }

    componentDidMount() {
        console.log("Component Mounted");
        // fetch information from the server
    }

    changeName(newName) {
        this.setState({ username: newName });
    }

    togglePopup() {
        this.setState({ isPopupOpen: !this.state.isPopupOpen });
    }

    render() {
        return (
            <div>
                <Logo />
                <ProfilePic
                    togglePopup={this.togglePopup}
                    // changeName={this.changeName}
                />
                {this.state.isPopupOpen && (
                    <Uploader username={this.state.username} />
                )}
                <h1>Hello from App</h1>
            </div>
        );
    }
}
