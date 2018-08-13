import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import App from "./App/App";
import { Router, Route } from "react-router-dom";
import { history } from "./_helpers/history";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import "../node_modules/toastr/build/toastr.min.css";
import "./assets/css/main.css";

ReactDOM.render(
  <Router history={history}>
    <Route component={App} />
  </Router>,

  document.getElementById("root")
);

registerServiceWorker();

{
  /*
  <Router history={history}>
    <Route component={App} />
  </Router>
  */
}
