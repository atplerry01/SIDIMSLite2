import React from "react";
import jwtDecode from "jwt-decode";

const Authorization = allowedRoles => WrappedComponent => {
  class AuthenticatedComponent extends React.Component {
    componentDidMount() {
      var ls = localStorage.getItem("wss.auth");
      var jwtToken = JSON.parse(ls);

      if (jwtToken) {
        var access_token = jwtDecode(jwtToken.access_token);
        this.analyseAuthentication(jwtToken, access_token);
      } else {
        this.props.history.push("/login");
      }
    }

    componentWillUpdate(nextProps) {
      var ls = localStorage.getItem("wss.auth");
      var jwtToken = JSON.parse(ls);

      if (jwtToken) {
        var access_token = jwtDecode(jwtToken.access_token);
        this.analyseAuthentication(jwtToken, access_token);
      } else {
        this.props.history.push("/login");
      }
    }

    analyseAuthentication(jwtToken, access_token) {
      var current_time = new Date().getTime() / 1000;

      if (current_time > access_token.exp) {
        //this.processRefreshtoken(jwtToken);
      }
    }

    processRefreshtoken(jwtToken) {
      if (jwtToken.refresh_token) {
        this.props.actions
          .refreshToken(jwtToken.refresh_token)
          .then(() => this.redirect())
          .catch(error => {
            //   //this.setState({ saving: false });
          });
      }
    }

    render() {
      return <WrappedComponent {...this.props} {...this.state} />;
    }
  }

  // function mapStateToProps(state, ownProps) {
  //   return {
  //     issueTrackers: state.issueTrackers
  //   };
  // }

  // function mapDispatchToProps(dispatch) {
  //   return {
  //     actions: bindActionCreators(userActions, dispatch)
  //   };
  // }

  return AuthenticatedComponent; //connect(mapStateToProps, mapDispatchToProps)(AuthenticatedComponent);
};

export default Authorization;
