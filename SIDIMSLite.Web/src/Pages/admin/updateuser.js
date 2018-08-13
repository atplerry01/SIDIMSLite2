import React, { Component } from "react";
import axios from "axios";
import { lookupDropDown } from "../../_selector/selectors";
import SelectInput from "../../Components/common/SelectInput";
import toastr from "toastr";
import { myConfig } from "../../App/config";

class UpdateUser extends Component {
  state = {
    user: {
      firstName: "",
      email: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      userName: ""
    },

    sidClientId: "",
    clientId: "",
    username: "",
    password: "",
    sidClients: "",
    firstName: "",
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    userName: ""
  };

  componentWillMount() {
    this.getAllClients();
    this.setState({ userId: this.props.match.params.id });

    console.log(this.props);
    console.log(this.props.match.params.id);

    this.RequestedUser(this.props.match.params.id);
  }

  handleChange = e => {
    console.log(e);
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  RequestedUser = entity => {
    axios
      .get(myConfig.apiUrl + "/api/account/user/" + entity)
      .then(response => {
        console.log(response.data);
        this.setState({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email,
          phoneNumber: response.data.phoneNumber,
          userName: response.data.userName
        });
      })
      .catch(function(error) {});
  };

  handleUserUpdate = e => {
    e.preventDefault();

    const {
      userName,
      email,
      clientId,
      phoneNumber,
      firstName,
      lastName,
      userId
    } = this.state;

    var userAccount = {
      userId: userId,
      username: userName,
      email: email,
      phoneNumber: phoneNumber,
      firstName: firstName,
      lastName: lastName
    };

    axios
      .post(myConfig.apiUrl + "/api/account/client/update", userAccount)
      .then(response => {
        console.log(response.data);
        toastr.success("Creation Successful.", "Account Creation");
        this.props.history.push("/admin");
      })
      .catch(function(error) {
        toastr.error("Creation Failed", "Account Creation");
      });
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
      sidClients,
      clientId,
      user,
      firstName,
      lastName,
      email,
      phoneNumber,
      userName
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
              <span className="icon-pagesx">Update User</span>
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
                />
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

              {/*
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Username</label>
                <input
                  type="text"
                  name="userName"
                  value={userName}
                  onChange={this.handleChange}
                  className="form-control"
                  placeholder="Enter email"
                />
              </div>
*/}
              <input
                type="submit"
                value="Submit"
                onClick={this.handleUserUpdate}
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

export default UpdateUser;
