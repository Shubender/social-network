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
            file: null,
            imgFromApp: null,
        };
        this.togglePopup = this.togglePopup.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        // this.changeName = this.changeName.bind(this);
    }

    componentDidMount() {
        console.log("Component Mounted");
        // fetch information from the server
        fetch("/user")
            .then((res) => res.json())
            .then((data) => {
                // console.log("Success app fetch: ", data);
                // console.log("User image: ", data.userData[0].imageurl);
                this.setState({ imgFromApp: data.userData[0].imageurl });

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

    handleSubmit(event) {
        console.log("File uploaded");
        event.preventDefault();

        const formData = new FormData();
        formData.append("file", this.state.file);

        fetch("/upload", {
            method: "POST",
            body: formData,
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log("upload file url", data.userFile.imageurl);
                this.setState({ imgFromApp: data.userFile.imageurl });
            })
            .catch((err) => {
                console.log("handleFileChange error: ", err);
            });
    }

    handleFileChange(event) {
        console.log("handleFileChange: ", event.target.files[0]);
        this.setState({ file: event.target.files[0] });
    }

    render() {
        // console.log("file: ", this.state.file);
        return (
            <div>
                <Logo />
                <ProfilePic
                    togglePopup={this.togglePopup}
                    username={this.state.fullname}
                    imgFromApp={this.state.imgFromApp}
                    // changeName={this.changeName}
                />
                {this.state.isPopupOpen && (
                    <Uploader
                        username={this.state.fullname}
                        handleFileChange={this.handleFileChange}
                        handleSubmit={this.handleSubmit}
                    />
                )}
                <h1>Hello from App</h1>
            </div>
        );
    }
}
