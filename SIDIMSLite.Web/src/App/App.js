import React, { Component } from "react";
import { Router, Route, Switch } from "react-router-dom";
import axios from "axios";
import { history } from "../_helpers/history";
import "../assets/css/custome.css";

import Authorized from "../Components/hoc/authorization";
import About from "../Pages/anonymous/About";
import Header from "../Components/common/Header";
import LoginPage from "../Pages/login/LoginPage";

import AdminPage from "../Pages/admin/admin";
import CreateUser from "../Pages/admin/createuser";
import CreateRMUser from "../Pages/admin/create-rm";
import ClientMIS from "../Pages/client/mis";
import StockDetail from "../Pages/client/stocklist";
import Inventory from "../Pages/inventory/mis";
import ChangePassword from "../Pages/account/changepassword";
import ConfirmEmail from "../Pages/account/confirmemail";
import UpdateUser from "../Pages/admin/updateuser";
import ForgotPassword from "../Pages/account/forgotpassword";
import ManagerMIS from "../Pages/manager/mis";
import NewStock from "../Pages/client/newstock";
import ManagerMISDetail from "../Pages/manager/stocklist";
import ManagerNewMISDetail from "../Pages/manager/new-stocklist";
import ManagerWasteMISDetail from "../Pages/manager/waste-stocklist";
import ManagerPersoMISDetail from "../Pages/manager/perso-stocklist";
import StockStatus from "../Pages/client/stockstatus";

class App extends Component {
  constructor(props, context) {
    super(props, context);

    var ls = localStorage.getItem("wss.auth");
    var jwtToken = JSON.parse(ls);
    var auth = false;

    if (jwtToken) auth = true;

    this.state = {
      authenticated: auth,
      page: "",
      clientId: 0
    };

    this.toggleAuthentication = this.toggleAuthentication.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  toggleAuthentication() {
    var ls = localStorage.getItem("wss.auth");
    var jwtToken = JSON.parse(ls);
    var auth = false;

    if (jwtToken) auth = true;

    this.setState({
      authenticated: auth
    });
  }

  handleLogout() {
    this.setState({ authenticated: false });
    localStorage.removeItem("wss.auth");
    this.props.history.push("/login");
  }

  render() {
    const Client = Authorized(["client"]);
    const Invent = Authorized(["inventory"]);
    const Admin = Authorized(["admin"]);

    const relativePath = history.location.pathname;
    const contentWrapper = { padding: 0 };

    return (
      <Router history={history} {...this.state}>
        <div>
          <Header
            pathName={relativePath}
            {...this.state}
            onHandleLogoutClick={this.handleLogout}
          />

          <main className="content-wrapper" style={contentWrapper}>
            <div className="container">
              <Switch>
                <Route path="/" exact component={Client(ClientMIS)} />

                <Route path="/about" component={About} />

                <Switch>
                  <Route
                    path="/mis"
                    exact
                    component={Client(ClientMIS)}
                    {...this.state}
                  />

                  <Route
                    path="/admin"
                    exact
                    component={Admin(AdminPage)}
                    {...this.state}
                  />

                  <Route
                    path="/admin/create-user"
                    exact
                    component={Admin(CreateUser)}
                    {...this.state}
                  />

                  <Route
                    path="/admin/create-rm"
                    exact
                    component={Admin(CreateRMUser)}
                    {...this.state}
                  />

                  <Route
                    path="/admin/update-user/:id"
                    exact
                    component={Admin(UpdateUser)}
                    {...this.state}
                  />

                  <Route
                    path="/mis/:id"
                    exact
                    component={Client(StockDetail)}
                  />

                  <Route
                    path="/issuance/:productId/:startDate/:endDate"
                    exact
                    component={Client(StockDetail)}
                  />

                  <Route
                    path="/issuance/:productId"
                    exact
                    component={Client(StockDetail)}
                  />

                  <Route
                    path="/new-stock/:productId/:startDate/:endDate"
                    exact
                    component={Client(NewStock)}
                  />

                  <Route
                    path="/stock-status"
                    exact
                    component={Client(StockStatus)}
                  />

                  <Route path="/manager" exact component={ManagerMIS} />

                  <Route
                    path="/manager/:clientId/:productId/new-stock/:startDate/:endDate"
                    exact
                    component={ManagerNewMISDetail}
                  />

                  <Route
                    path="/manager/:clientId/:productId/waste/:startDate/:endDate"
                    exact
                    component={ManagerWasteMISDetail}
                  />

                  <Route
                    path="/manager/:clientId/:productId/perso/:startDate/:endDate"
                    exact
                    component={ManagerMISDetail}
                  />

                  <Route
                    path="/manager/:clientId/:id"
                    exact
                    component={ManagerMISDetail}
                  />

                  <Route
                    path="/manager/issuance/:clientId/:productId/:startDate/:endDate"
                    exact
                    component={ManagerPersoMISDetail}
                  />

                  <Route
                    path="/inventory"
                    exact
                    render={() => <Inventory {...this.state} />}
                  />

                  <Route
                    path="/login"
                    render={routeProps => (
                      <LoginPage
                        changeLoginAuth={this.toggleAuthentication}
                        {...routeProps}
                        {...this.props}
                        {...this.state}
                      />
                    )}
                  />

                  <Route
                    path="/account/change-password"
                    component={Client(ChangePassword)}
                  />

                  <Route
                    path="/account/confirmemail"
                    component={ConfirmEmail}
                  />

                  <Route path="/forgot-password" component={ForgotPassword} />
                </Switch>
              </Switch>
            </div>
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
