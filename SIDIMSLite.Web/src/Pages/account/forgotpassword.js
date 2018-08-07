import React, { Component } from "react";
import toastr from "toastr";
import axios from "axios";
import Validator from "validator";
import InlineError from "../../Components/common/InlineError";

class ForgotPassword extends Component {
  state = {
    email: "",
    errors: {}
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  validate = email => {
    const errors = {};
    if (!Validator.isEmail(email)) errors.email = "Invalid email";

    return errors;
  };

  handleSubmit = e => {
    e.preventDefault();

    const { email } = this.state;

    const errors = this.validate(email);
    this.setState({ errors });

    if (Object.keys(errors).length === 0) {
      var userData = {
        email: email
      };

      axios
        .post("https://localhost:5001/api/account/ForgotPassword", userData)
        .then(response => {
          console.log(response.data);
          toastr.success("Email Sent Successful.", "Password Reset");
          this.props.history.push("/login");
        })
        .catch(function(error) {
          toastr.error("Reset Failed", "Password Reset");
        });
    }
  };

  render() {
    const { email, errors } = this.state;

    return (
      <div className="row">
        <div className="col-lg-4">
          <header>
            <h2>
              <span className="icon-pagesx" />Forgot Password
            </h2>
          </header>

          <div>
            <form>
              <div className="form-group">
                <label htmlFor="exampleInputEmail">Email Address</label>
                <input
                  type="text"
                  name="email"
                  value={email}
                  onChange={this.handleChange}
                  className="form-control"
                  placeholder="Enter Email"
                />
                {errors.email && <InlineError text={errors.email} />}
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

export default ForgotPassword;
