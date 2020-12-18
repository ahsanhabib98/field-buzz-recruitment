import React from "react";
import {Card, Container, Navbar, Nav} from "react-bootstrap";
import { withRouter } from "react-router-dom";
import * as actions from "../store/actions/auth";
import {connect} from "react-redux";

class CustomLayout extends React.Component {
    render() {
        return (
            <div>
                <Container>
                    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                      <Navbar.Brand href='/'>
                          Field Buzz Recruitment
                      </Navbar.Brand>
                      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                      <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">

                        </Nav>

                        {this.props.isAuthenticated ? (
                            <Nav>
                                <Nav.Link onClick={this.props.logout}>Logout</Nav.Link>
                            </Nav>
                        ) : (
                            <Nav>
                                <Nav.Link href='/login'>
                                    Login
                                </Nav.Link>
                            </Nav>
                        )}

                      </Navbar.Collapse>
                    </Navbar>
                    <Card>
                      <Card.Body>
                          {this.props.children}
                      </Card.Body>
                    </Card>
                </Container>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout())
    }
}

export default withRouter(connect(null, mapDispatchToProps)(CustomLayout));