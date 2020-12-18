import React from "react";
import Hoc from "./hoc/hoc";
import {Route} from "react-router-dom";
import LoginForm from "./containers/Login";
import Form from "./containers/Form";
import Message from "./containers/message";

const BaseRouter = () => (
    <Hoc>
      <Route exact path="/login" component={LoginForm} />
      <Route exact path="/" component={Form} />
      <Route exact path="/message" component={Message} />
    </Hoc>
);

export default BaseRouter;