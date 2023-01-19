import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Profile(props) {
    return (
        <>
            <Container>
                <Row className="px-4 my-5">
                    <Col sm={4}>
                        <div className="big-pic">{props.profilePicProps}</div>
                    </Col>
                    <Col sm={8}>
                        <h1>Hi {props.firstname}!</h1>
                        <p className="bio-editor mt-4">{props.bioEditorProps}</p>
                    </Col>
                </Row>
            </Container>
            ;
        </>
    );
}
