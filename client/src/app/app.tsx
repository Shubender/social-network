import { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Logo from "../components/logo";
import ProfilePic from "../components/ProfilePic";
import Uploader from "../components/Uploader";
import Profile from "../components/Profile";
import BioEditor from "../components/BioEditor";
import FindPeople from "../components/FindPeople";
import OtherProfile from "../components/OtherProfile";
import FindFriends from "../components/Friends";


export class App extends Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            isPopupOpen: false,
            firstname: null,
            lastname: null,
            fullname: null,
            userBio: null,
            userId: null,
            file: null,
            imgFromApp: null,
            user: null,
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
                // console.log("Success app fetch: ", data.userData[0]);

                this.setState({ firstname: data.userData[0].firstname });
                this.setState({ lastname: data.userData[0].lastname });
                this.setState({ imgFromApp: data.userData[0].imageurl });
                this.setState({ userBio: data.userData[0].userbio });
                this.setState({ userId: data.userData[0].id });
                this.setState({ user: data.userData[0] });

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
        // console.log("handleFileChange: ", event.target.files[0]);
        this.setState({ file: event.target.files[0] });
    }

    handleSubmitBio(event) {
        // console.log("handleSubmitBio: ", event);
        event.preventDefault();

        fetch("/updatebio", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userBio: this.state.userBio }),
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                // console.log("Bio updated", data);
                // this.setState({ userBio: event.target.value });
                console.log("User data (app): ", this.state.user);
            })
            .catch((err) => {
                console.log("handleSubmitBio error: ", err);
            });
    }

    handleBioChange(event) {
        // console.log("handleBioChange: ", event.target.value);
        this.setState({ userBio: event.target.value });
    }

    assignToUsers = (event) => {
        event.preventDefault();
        location.assign("/users");
        return;
    };

    assignToFriends = (event) => {
        event.preventDefault();
        location.assign("/friends");
        return;
    };

    render() {
        // console.log("file: ", this.state.file);
        return (
            <div>
                <div className="small-pic">
                    <Logo />
                    <h2 className="find-people" onClick={this.assignToUsers}>
                        Find People
                    </h2>
                    <h2 className="friends" onClick={this.assignToFriends}>
                        Friends
                    </h2>
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
                    <BrowserRouter>
                        <Routes>
                            <Route
                                path="/users"
                                element={<FindPeople />}
                            ></Route>
                            <Route
                                path="/friends"
                                element={<FindFriends />}
                            ></Route>
                            <Route
                                path="/"
                                element={
                                    <Profile
                                        firstname={this.state.firstname}
                                        lastname={this.state.lastname}
                                        profilePicProps={
                                            <ProfilePic
                                                togglePopup={null}
                                                username={this.state.fullname}
                                                imgFromApp={
                                                    this.state.imgFromApp
                                                }
                                                // changeName={this.changeName}
                                            />
                                        }
                                        bioEditorProps={
                                            <BioEditor
                                                userBio={this.state.userBio}
                                                handleBioChange={
                                                    this.handleBioChange
                                                }
                                                handleSubmitBio={
                                                    this.handleSubmitBio
                                                }
                                            />
                                        }
                                    />
                                }
                            ></Route>
                            <Route
                                path="/user/:id"
                                element={
                                    <OtherProfile userId={this.state.userId} />
                                }
                            ></Route>
                        </Routes>
                    </BrowserRouter>
                </div>
            </div>
        );
    }
}
