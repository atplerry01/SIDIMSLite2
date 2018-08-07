import React, { Component } from "react";
import toastr from "toastr";
import axios from "axios";

class ForgotPassword extends Component {
  state = {
    email: ""
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { email } = this.state;

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
  };

  render() {
    const { email } = this.state;

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
