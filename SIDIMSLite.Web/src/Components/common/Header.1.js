import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import "../../Components/common/custom-component.css";

import HomeHeader from '../../Components/common/HomeHeader';
import PageHeader from '../../Components/common/PageHeader';

class Header extends Component {
  onHandleLogoutClick() {
    this.props.onHandleLogoutClick();
  }

  render() {

    var headerView;

    if (this.props.pathName === '/') {
      headerView = <PageHeader />
    } else {
      headerView = <PageHeader />
    }
    
    return (
      <div>
        {headerView}
      </div>
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
