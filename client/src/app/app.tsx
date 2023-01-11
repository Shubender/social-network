import { Component } from "react";
import Logo from "../components/logo";
import ProfilePic from "../components/ProfilePic";
import Uploader from "../components/Uploader";
import Profile from "../components/Profile";
import BioEditor from "../components/BioEditor";

export class App extends Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            isPopupOpen: false,
            firstname: null,
            lastname: null,
            fullname: null,
            userBio: null,
            file: null,
            imgFromApp: null,
        };
        this.togglePopup = this.togglePopup.bind(this);
        this.handleSubmitUpload = this.handleSubmitUpload.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleBioChange = this.handleBioChange.bind(this);
        this.handleSubmitBio = this.handleSubmitBio.bind(this);

        // this.changeName = this.changeName.bind(this);
    }

    componentDidMount() {
        // console.log("Component Mounted");
        // fetch information from the server
        fetch("/user")
            .then((res) => res.json())
            .then((data) => {
                console.log("Success app fetch: ", data.userData[0]);

                this.setState({ firstname: data.userData[0].firstname });
                this.setState({ lastname: data.userData[0].lastname });
                this.setState({ imgFromApp: data.userData[0].imageurl });
                this.setState({ userBio: data.userData[0].userBio });

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

    handleSubmitUpload(event) {
        // console.log("File uploaded");
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
                this.togglePopup();
            })
            .catch((err) => {
                console.log("handleFileChange error: ", err);
            });
    }

    handleFileChange(event) {
        console.log("handleFileChange: ", event.target.files[0]);
        this.setState({ file: event.target.files[0] });
    }

    handleSubmitBio(event) {
        console.log("handleSubmitBio: ", event);
        event.preventDefault();

        fetch("/updatebio", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state.userBio),
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log("Bio updated", data);
                this.setState({ userBio: event.target.value });
                this.togglePopup();
            })
            .catch((err) => {
                console.log("handleSubmitBio error: ", err);
            });
    }

    handleBioChange(event) {
        console.log("handleBioChange: ", event.target.value);
        this.setState({ userBio: event.target.value });
    }

    render() {
        // console.log("file: ", this.state.file);
        return (
            <div>
                <div className="small-pic">
                    <Logo />
                    <ProfilePic
                        togglePopup={this.togglePopup}
                        username={this.state.fullname}
                        imgFromApp={this.state.imgFromApp}
                        // changeName={this.changeName}
                    />
                </div>
                <div className="uploader">
                    {this.state.isPopupOpen && (
                        <Uploader
                            username={this.state.fullname}
                            handleFileChange={this.handleFileChange}
                            handleSubmitUpload={this.handleSubmitUpload}
                        />
                    )}
                </div>
                <div>
                    <Profile
                        firstname={this.state.firstname}
                        lastname={this.state.lastname}
                        profilePicProps={
                            <ProfilePic
                                togglePopup={null}
                                username={this.state.fullname}
                                imgFromApp={this.state.imgFromApp}
                                // changeName={this.changeName}
                            />
                        }
                        bioEditorProps={
                            <BioEditor
                                userBio={this.state.userBio}
                                handleBioChange={this.handleBioChange}
                                handleSubmitBio={this.handleSubmitBio}
                            />
                        }
                    />
                </div>
                <h2>Hello from App</h2>
            </div>
        );
    }
}
