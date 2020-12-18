import React from "react";
import {Alert} from "react-bootstrap";

class Message extends React.Component {
    render() {
        return (
            <div>
                <Alert variant="success">Your form data post successfully.</Alert>
            </div>
        )
    }
}

export default Message;