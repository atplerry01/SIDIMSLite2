import React from "react";
import PropTypes from "prop-types";

const InlineError = ({ text }) => (
  <span style={{ color: "#ae5856" }}>{text}</span>
);

InlineError.prototypes = {
  text: PropTypes.string.isRequired
};

export default InlineError;
