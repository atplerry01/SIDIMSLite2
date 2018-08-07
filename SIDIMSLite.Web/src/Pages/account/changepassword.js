import React, { Component } from "react";
import toastr from "toastr";
import axios from "axios";

class ChangePassword extends Component {
  state = {};

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { password, confirmPassword } = this.state;

    var ls = localStorage.getItem("wss.auth");
    var jwtToken = JSON.parse(ls);

    console.log(jwtToken.userName);

    var changePassword = {
      UserId: jwtToken.userName,
      NewPassword: password
    };

    console.log(changePassword);

    axios
      .post("https://localhost:5001/api/account/ChangePassword", changePassword)
      .then(response => {
        console.log(response.data);
        toastr.success("Change Successful.", "Password Change");
        this.props.history.push("/mis");
      })
      .catch(function(error) {
        console.log(error);
        toastr.error("Change Failed", "Password Change");
      });

    ///
  };

  render() {
    const { changePassword, password } = this.state;

    return (
      <div className="row">
        <div className="col-lg-4">
          <header>
            <h2>
              <span className="icon-pagesx" />Change Password
            </h2>
          </header>

          <div>
            <form>
              <div className="form-group">
                <label htmlFor="exampleInputEmail">New Password</label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={this.handleChange}
                  className="form-control"
                  placeholder="Enter Password"
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1"> Confirm Password</label>
                <input
                  type="password"
                  name="changePassword"
                  value={changePassword}
                  onChange={this.handleChange}
                  className="form-control"
                  placeholder="Confirm Password"
                />
              </div>

              <input type="submit" value="Submit" onClick={this.handleSubmit} />

              <span className="clearfix" />
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

export default ChangePassword;
