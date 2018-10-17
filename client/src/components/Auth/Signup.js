import React, { Component } from 'react';

class Signup extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  };

  handleChange = event => {
    const { name, value } = event.target;
    // console.log(name, ':', value);
    this.setState({
      [name]: (value).trim()
    })
  };

  render() {
    const { username, email, password, passwordConfirmation } = this.state;

    return (
      <div className="App">
        <h2 className="App">Signup</h2>
        <form className="form">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            onChange={this.handleChange}
            value={username}
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            onChange={this.handleChange}
            value={email}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            onChange={this.handleChange}
            value={password}
          />
          <label htmlFor="passwordConfirmation">Confirm Password</label>
          <input
            type="password"
            name="passwordConfirmation"
            id="passwordConfirmation"
            placeholder="Confirm Password"
            onChange={this.handleChange}
            value={passwordConfirmation}
          />
          <div>
            <button className="button-primary">Signup</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Signup;
