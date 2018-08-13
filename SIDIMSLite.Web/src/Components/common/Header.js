import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import "../../Components/common/custom-component.css";

import HomeHeader from "../../Components/common/HomeHeader";
import PageHeader from "../../Components/common/PageHeader";

class Header extends Component {
  constructor(props, context) {
    super(props, context);

    const ls = localStorage.getItem("wss.auth");
    const jwtToken = JSON.parse(ls);
    var fullName, clientName;

    if (jwtToken) {
      fullName = jwtToken.firstName + " " + jwtToken.lastName;
      clientName = jwtToken.clientName;
    }

    this.state = {
      fullName: fullName,
      clientName: clientName
    };
  }

  onHandleLogoutClick() {
    this.props.onHandleLogoutClick();
  }

  componentDidMount() {
    var ls = localStorage.getItem("wss.auth");
    var jwtToken = JSON.parse(ls);
  }

  render() {
    var ls = localStorage.getItem("wss.auth");
    var jwtToken = JSON.parse(ls);

    return (
      <header id="hero" className="hero overlay">
        <nav className="navbar">
          <div className="container">
            <div className="navbar-header">
              <button
                type="button"
                className="navbar-toggle collapsed"
                data-toggle="collapse"
                data-target="#navbar-collapse"
                aria-expanded="false"
              >
                <span className="sr-only">Toggle navigation</span>
                <span className="fa fa-bars" />
              </button>
              <NavLink
                to="/"
                className="brand"
                style={{ fontSize: "32px", color: "#fff" }}
              >
                SIDIMSLite
              </NavLink>
            </div>
            <div className="navbar-collapse collapse" id="navbar-collapse">
              <ul className="nav navbar-nav navbar-right">
                <li>
                  {this.props.authenticated && (
                    <div style={{ paddingRight: "15px" }}>
                      <a className="">
                        Welcome <br />
                        <div style={{ fontSize: "14px" }}>
                          {this.state.fullName}
                        </div>
                        <div style={{ fontSize: "10px" }}>
                          {jwtToken.clientName}
                        </div>
                      </a>
                    </div>
                  )}
                </li>
                <li>
                  {!this.props.authenticated && <span />}
                  {this.props.authenticated && (
                    <div>
                      <div>
                        <a
                          className="btn btn-success nav-btn"
                          onClick={this.onHandleLogoutClick.bind(this)}
                        >
                          Logout
                        </a>
                      </div>
                      <div style={{ paddingTop: 12 }}>
                        <NavLink
                          style={{
                            paddingTop: 12,
                            fontSize: 11,
                            color: "#fff"
                          }}
                          to="/account/change-password"
                        >
                          Change Password
                        </NavLink>
                      </div>
                    </div>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}

Header.contextTypes = {
  router: PropTypes.object
};

// function mapStateToProps(state, ownProps) {
//   return {
//     authenticated: state.authenticated
//   };
// }
export default Header; //connect(mapStateToProps, userActions)(Header);
