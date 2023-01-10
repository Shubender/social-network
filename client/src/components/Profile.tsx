export default function Profile(props) {
    return (
        <>
            <h1>Hi {props.firstname}!</h1>
            <div className="big-pic">{props.profilePicProps}</div>
            <div className="bio-editor">{props.bioEditorProps}</div>
        </>
    );
}
