import React, { Component } from "react";

export class Signup extends Component {
  state = { username: "", email: "", password: "", passwordConfirmation: "" };

  handleChange = event => {
    const { name, value } = event.target;
    // console.log(name, ':', value);
    this.setState({
      [name]: value
    });
  };

  render() {
    const { username, email, password, passwordConfirmation } = this.state;
    return (
      <div className="App">
        <h2 className="App">Signup</h2>
        <form className="form">
          <label htmlFor="username">
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              onChange={this.handleChange}
              value={username}
            />
            Username
          </label>
          <label htmlFor="email">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              onChange={this.handleChange}
              value={email}
            />
            Email
          </label>
          <label htmlFor="password">
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              onChange={this.handleChange}
              value={password}
            />
            Password
          </label>
          <label htmlFor="passwordConfirmation">
            <input
              type="password"
              name="passwordConfirmation"
              id="passwordConfirmation"
              placeholder="Confirm Password"
              onChange={this.handleChange}
              value={passwordConfirmation}
            />
            Confirm Password
          </label>
          <div>
            <button type="button" className="button-primary">
              Signup
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Signup;
