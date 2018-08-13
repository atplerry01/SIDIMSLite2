import React, { Component } from "react";
import axios from "axios";
import Validator from "validator";
import toastr from "toastr";
import { myConfig } from "../../App/config";

import { lookupDropDown } from "../../_selector/selectors";
import SelectInput from "../../Components/common/SelectInput";
import InlineError from "../../Components/common/InlineError";

class CreateUser extends Component {
  state = {
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    sidClientId: "",
    clientId: "",
    username: "",
    password: "",
    sidClients: "",
    errors: {}
  };

  componentWillMount() {
    this.getAllClients();
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  validateEmail = email => {
    const errors = {};
    if (!Validator.isEmail(email)) errors.email = "Invalid email";
    return errors;
  };

  handleUserCreation = e => {
    e.preventDefault();

    const errors = this.validateEmail(this.state.email);
    this.setState({ errors });

    if (Object.keys(errors).length === 0) {
      const {
        username,
        password,
        email,
        clientId,
        phoneNumber,
        firstName,
        lastName
      } = this.state;

      var userAccount = {
        username: username,
        password: password,
        email: email,
        phoneNumber: phoneNumber,
        sidClientId: clientId,
        firstName: firstName,
        lastName: lastName
      };

      axios
        .post(myConfig.apiUrl + "/api/account/client/create", userAccount)
        .then(response => {
          console.log(response.data);
          toastr.success("Creation Successful.", "Account Creation");
          this.props.history.push("/admin");
        })
        .catch(function(error) {
          toastr.error("Creation Failed", "Account Creation");
        });
    }
  };

  getAllClients = () => {
    axios
      .get(myConfig.apiUrl + "/api/clients")
      .then(response => {
        console.log(response.data);
        this.setState({ sidClients: response.data });
      })
      .catch(function(error) {});
  };

  render() {
    const {
      firstName,
      lastName,
      email,
      username,
      password,
      phoneNumber,
      sidClients,
      clientId,
      errors
    } = this.state;
    const clients = lookupDropDown(sidClients);

    const dropClients = () => {
      if (clients) {
        return (
          <SelectInput
            name="clientId"
            label=" Clients"
            value={clientId}
            onChange={this.handleChange}
            defaultOption="Select Client"
            options={clients}
          />
        );
      }
    };

    return (
      <div className="row">
        <div className="col-lg-4">
          <header>
            <h2>
              <span className="icon-pagesx">Create User</span>
            </h2>
          </header>

          <div>
            <form>
              <div className="form-group">{dropClients()}</div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={firstName}
                  onChange={this.handleChange}
                  className="form-control"
                  placeholder="First Name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="exampleInputEmail1">LastName</label>
                <input
                  type="text"
                  name="lastName"
                  value={lastName}
                  onChange={this.handleChange}
                  className="form-control"
                  placeholder="Last Name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email Address</label>
                <input
                  type="text"
                  name="email"
                  value={email}
                  onChange={this.handleChange}
                  className="form-control"
                  placeholder="Email Address"
                  required
                />{" "}
                {errors.email && <InlineError text={errors.email} />}
              </div>

              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Phone Number</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={phoneNumber}
                  onChange={this.handleChange}
                  className="form-control"
                  placeholder="Phone Number"
                />
              </div>

              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Username</label>
                <input
                  type="text"
                  name="username"
                  value={username}
                  onChange={this.handleChange}
                  className="form-control"
                  placeholder="Enter email"
                />
              </div>

              <input
                type="submit"
                value="Submit"
                onClick={this.handleUserCreation}
              />

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

export default CreateUser;
