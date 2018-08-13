import React, { Component } from "react";
import QueryString from "../../query-string"; //"query-string";
import axios from "axios";
import { myConfig } from "../../App/config";

class ConfirmEmail extends Component {
  state = {};

  componentWillReceiveProps() {}

  componentWillMount() {
    const parse = QueryString.parse(this.props.location.search);
    console.log(parse);

    console.log(parse.code);
    console.log(parse.userId);

    this.getConfirmEmail(parse.userId, parse.code);
  }

  render() {
    return <div>Confirm Email</div>;
  }

  getConfirmEmail(userId, code) {
    axios
      .post(
        "https://localhost:5001/api/account/ConfirmEmail/?userId=" +
          userId +
          "&code=" +
          code
      )
      .then(response => {
        console.log(response.data);
        //this.setState({ productName: response.data });
      })
      .catch(function(error) {});
  }
}

export default ConfirmEmail;
