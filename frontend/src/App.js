import React, {Component} from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import {connect} from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css';
import * as actions from './store/actions/auth';
import CustomLayout from "./containers/Layout";
import BaseRouter from "./routes";

class App extends Component {

  componentDidMount() {
      this.props.onTryAutoSignup();
  }

    render() {
    return (
        <div>
            <Router>
              <CustomLayout {...this.props}>
                  <BaseRouter />
              </CustomLayout>
            </Router>
        </div>
    );
  }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
