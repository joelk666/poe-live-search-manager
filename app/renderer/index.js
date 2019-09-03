import React from "react";
import * as ReactDOM from "react-dom";
import { HashRouter as Router } from "react-router-dom";
import App from "./containers/App/App";
import Firebase from "./components/Firebase/Firebase";
import setupIPCEvents from "./SetupIPCEvents/SetupIPCEvents";

setupIPCEvents();

ReactDOM.render(
  <Router>
    <Firebase>
      <App />
    </Firebase>
  </Router>,
  document.getElementById("root")
);