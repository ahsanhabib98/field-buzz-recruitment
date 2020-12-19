import React from "react";
import {connect} from "react-redux";
import { Redirect } from "react-router-dom";
import {Button, Form, Spinner} from "react-bootstrap";
import * as actions from "../store/actions/auth"

class LoginForm extends React.Component {

    state = {
        username: "",
        password: ""
    };

    componentDidMount() {
      if(this.props.isAuthenticated) {
          this.props.history.push('/')
      }
    };

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value});
    };

    handleSubmit = e => {
        e.preventDefault();
        const {username, password} = this.state;
        this.props.login(username, password);
        this.props.history.push('/')
    };

    render() {
        const {username, password} = this.state;
        const {error, loading, token} = this.props;

        if (token) {
            return <Redirect to='/' />
        }

        let errorMessage = null;
        if (error) {
            errorMessage = (
                <p>{error.message}</p>
            );
        }

        return (
            <div>
                {errorMessage}
                {loading ? (
                    <Spinner animation="border" />
                ) : (
                        <Form onSubmit={this.handleSubmit}>
                          <Form.Group controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Enter username"
                                value={username}
                                name="username"
                                onChange={this.handleChange}
                            />
                          </Form.Group>

                          <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                required
                                type="password"
                                placeholder="Password"
                                value={password}
                                name="password"
                                onChange={this.handleChange}
                            />
                          </Form.Group>

                          <Button variant="primary" type="submit">
                            Login
                          </Button>
                            <br/>
                        </Form>
                    )
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.loading,
        error: state.error,
        token: state.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login: (username, password) => dispatch(actions.authLogin(username, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);