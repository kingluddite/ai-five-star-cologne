import React, { Component } from "react";
import PropTypes from "prop-types";

class Error extends Component {
  static propTypes = {
    error: PropTypes.object.isRequired
  };

  render() {
    const { error } = this.props;

    return <p>{error.message}</p>;
  }
}

export default Error;
