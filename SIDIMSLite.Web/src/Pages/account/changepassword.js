import React, { Component } from "react";
import toastr from "toastr";
import axios from "axios";
import Validator from "validator";
import PropTypes from "prop-types";

import InlineError from "../../Components/common/InlineError";

class ChangePassword extends Component {
  state = {
    errors: {}
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  validatePasswordCompare = (password, confirmPassword) => {
    const errors = {};

    console.log(password, confirmPassword);

    if (password === "" || confirmPassword === "") {
      errors.confirmPassword = "Password Mismatch";
      return errors;
    } else {
      if (!Validator.equals(password, confirmPassword))
        errors.confirmPassword = "Password Mismatch";
    }

    return errors;
  };

  handleSubmit = e => {
    e.preventDefault();

    const { oldPassword, password, confirmPassword } = this.state;

    console.log(oldPassword, password, confirmPassword);

    const errors = this.validatePasswordCompare(password, confirmPassword);
    this.setState({ errors });

    if (Object.keys(errors).length === 0) {
      var ls = localStorage.getItem("wss.auth");
      var jwtToken = JSON.parse(ls);

      var changePassword = {
        UserId: jwtToken.userName,
        NewPassword: password,
        oldPassword: oldPassword
      };

      axios
        .post(
          "https://localhost:5001/api/account/ChangePassword",
          changePassword
        )
        .then(response => {
          console.log(response.data);
          toastr.success("Change Successful.", "Password Change");
          this.props.history.push("/mis");
        })
        .catch(function(error) {
          console.log(error);
          toastr.error("Change Failed", "Password Change");
        });
    }
  };

  render() {
    const { oldPassword, confirmPassword, password, errors } = this.state;

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
                <label htmlFor="exampleInputEmail">Old Password</label>
                <input
                  type="password"
                  name="oldPassword"
                  value={oldPassword}
                  onChange={this.handleChange}
                  className="form-control"
                  placeholder="Enter Old Password"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="exampleInputEmail">New Password</label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={this.handleChange}
                  className="form-control"
                  placeholder="Enter Password"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1"> Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={this.handleChange}
                  className="form-control"
                  placeholder="Confirm Password"
                  required
                />{" "}
                {errors.confirmPassword && (
                  <InlineError text={errors.confirmPassword} />
                )}
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

ChangePassword.prototypes = {
  oldPassword: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
  //changePassword: PropTypes.string.isRequired
};
export default ChangePassword;
