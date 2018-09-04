import React, { Component } from "react";
import toastr from "toastr";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { myConfig } from "../../App/config";

class LoginPage extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      username: "",
      password: "",
      submitted: false,
      errors: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();

    console.log("started");

    this.setState({ submitted: true });
    const { username, password } = this.state;

    if (username && password) {
      var data =
        "grant_type=password&username=" + username + "&password=" + password;
      data = data + "&client_id=ngAuthApp";

      console.log(data);

      return axios
        .post(myConfig.apiUrl + "/api/token", data, {
          headers: { "Content-Type": "application/x-www-form-urlencoded" }
        })
        .then(auth => {
          localStorage.setItem("wss.auth", JSON.stringify(auth.data));

          console.log(auth.data);

          this.setState({ page: auth.data.page, clientId: auth.data.clientId });

          if (this.state.page === "Admin") {
            toastr.success("Login Successful.", "Login");
            this.props.history.push("/admin");
          } else if (this.state.page === "Inventory") {
            this.props.history.push("/inventory");
          } else if (this.state.page === "Client") {
            toastr.success("Login Successful.", "Login");

            if (auth.data.isReviewed === false) {
              this.props.history.push("/account/change-password");
            } else {
              this.props.history.push("/mis");
            }
          } else if (this.state.page === "Manager") {
            this.props.history.push("/manager");
          }

          window.location.reload();
        })
        .catch(error => {
          toastr.error("Incorrect Username/ Password", "Login Failed");
          console.log(error);
          const errors = {};
          errors.message = "Invalid username/ Password";
          this.setState({ errors: errors });
          throw error;
        });
    }
  }

  redirect() {
    this.props.changeLoginAuth();
    this.setState({ saving: false });
    toastr.success("Login Successful.");
    this.props.history.push("/trackers");
  }

  render() {
    const loginCard = {
      margin: "40px 0 0 0"
    };

    const { username, password, errors } = this.state;

    return (
      <div className="row">
        <div className="col-lg-4">
          <header>
            <h2>
              <span className="icon-pagesx" />
              Account Login
            </h2>
          </header>

          <div>
            <form>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Username</label>
                <input
                  type="text"
                  name="username"
                  value={username}
                  onChange={this.handleChange}
                  className="form-control"
                  placeholder="Enter Username"
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={this.handleChange}
                  className="form-control"
                  placeholder="Password"
                />
              </div>
              <div>
                {errors.message && (
                  <span style={{ color: "red", fontSize: 11 }}>
                    {errors.message}
                  </span>
                )}
              </div>
              <input type="submit" value="Submit" onClick={this.handleSubmit} />

              <span className="clearfix" />
              <br />
              <NavLink to="/forgot-password" style={{ fontSize: 13 }}>
                Forgot Password
              </NavLink>
            </form>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="sidebar" />
        </div>
      </div>
    );
  }
}

export default LoginPage;
