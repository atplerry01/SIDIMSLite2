import React, { Component } from "react";
import axios from "axios";
import moment from "moment";
import { NavLink } from "react-router-dom";
import { myConfig } from "../../App/config";

class Admin extends Component {
  state = {};

  componentDidMount() {
    this.getClients();
  }

  gotoCreateUser = () => {
    this.props.history.push("/admin/create-user");
  };

  handleUpdate = user => {
    this.props.history.push("/admin/update-user/" + user.userId);
  };

  render() {
    const { clientusers } = this.state;
    const userTable = () => {
      if (clientusers) {
        return clientusers.map((entity, index) => {
          return (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>
                {entity.user.firstName} {entity.user.lastName}
              </td>
              <td>{entity.user.email}</td>
              <td>{entity.user.phoneNumber}</td>
              <td>{entity.user.userName}</td>
              <td>{entity.clientName}</td>
              <td>
                <span onClick={() => this.handleUpdate(entity)}>
                  <i className="fa fa-pencil-square-o" aria-hidden="true" />
                  Update
                </span>
              </td>
            </tr>
          );
        });
      }
    };

    return (
      <div>
        <section className="topics2">
          <div className="container">
            <div className="row">
              <div className="col-lg-12" ref={el => (this.componentRef = el)}>
                <header>
                  <h2>Registered Users</h2>
                </header>

                <div className="row">
                  <div className="col-md-12">
                    <div className="row" style={{ margin: "20px 0 20px" }}>
                      {/*
                      <div className="col-lg-8">
                        <input
                          type="text"
                          value={this.state.search}
                          placeholder=" Search Job Remark"
                        />
                      </div>*/}

                      <div className="col-lg-4">
                        <input
                          type="submit"
                          value="Create a new User"
                          className="btn btn-primary"
                          onClick={this.gotoCreateUser}
                        />
                      </div>
                    </div>

                    <table
                      className="table table-sm stock-table"
                      id="table-to-xls"
                    >
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Full Name</th>
                          <th scope="col">Email</th>
                          <th scope="col">Phone Number</th>
                          <th scope="col">Username</th>
                          <th>Client Name</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>{userTable()}</tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  getClients(clientId) {
    axios
      .get(myConfig.apiUrl + "/api/admin/clientusers")
      .then(response => {
        console.log(response.data);
        this.setState({ clientusers: response.data });
      })
      .catch(function(error) {});
  }
}

export default Admin;
