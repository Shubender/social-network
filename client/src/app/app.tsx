import { Component } from "react";
import Logo from "../components/logo";
import ProfilePic from "../components/ProfilePic";
import Uploader from "../components/Uploader";

export class App extends Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            isPopupOpen: false,
            firstname: "",
            lastname: "",
            fullname: "",
        };
        this.togglePopup = this.togglePopup.bind(this);
        // this.changeName = this.changeName.bind(this);
    }

    componentDidMount() {
        console.log("Component Mounted");
        // fetch information from the server
        fetch("/user")
            .then((res) => res.json())
            .then((data) => {
                // console.log("Success app fetch: ", data);
                // console.log("User name: ", data.userData[0].firstname);

                this.setState({
                    fullname:
                        data.userData[0].firstname +
                        " " +
                        data.userData[0].lastname,
                });
            })
            .catch((err) => {
                console.log("Fetch user data error: ", err);
            });
    }

    // changeName(newName) {
    //     this.setState({ username: newName });
    // }

    togglePopup() {
        this.setState({ isPopupOpen: !this.state.isPopupOpen });
    }

    render() {
        return (
            <div>
                <Logo />
                <ProfilePic
                    togglePopup={this.togglePopup}
                    username={this.state.fullname}
                    imgFromApp={false}
                    // changeName={this.changeName}
                />
                {this.state.isPopupOpen && (
                    <Uploader username={this.state.fullname} />
                )}
                <h1>Hello from App</h1>
            </div>
        );
    }
}
