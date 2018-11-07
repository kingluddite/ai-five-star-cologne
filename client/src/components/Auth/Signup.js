import React, { Component } from "react";

// GraphQL
import { Mutation } from "react-apollo";
import { SIGNUP_USER_MUTATION } from "../../queries";

// custom components
import Error from "../Error";

const initialState = {
  username: "",
  email: "",
  password: "",
  passwordConfirmation: ""
};

class Signup extends Component {
  state = {
    ...initialState
  };

  clearForm = () => {
    this.setState({
      ...initialState
    });
  };

  handleChange = event => {
    const { name, value } = event.target;
    // console.log(name, ':', value);
    this.setState({
      [name]: value
    });
  };

  handleSubmit = (event, signupUser) => {
    event.preventDefault();
    signupUser().then(data => {
      console.log(data);
      this.clearForm();
    });
  };

  render() {
    const { username, email, password, passwordConfirmation } = this.state;
    return (
      <div className="App">
        <h2 className="App">Signup</h2>
        <Mutation
          mutation={SIGNUP_USER_MUTATION}
          variables={{ username, email, password }}
        >
          {(signupUser, { data, loading, error }) => {
            if (loading) return <div>Loading...</div>;
            // if (error) return <div>Error {error.message}</div>;
            console.log(data);

            return (
              <form
                className="form"
                onSubmit={event => this.handleSubmit(event, signupUser)}
              >
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
                  <button type="submit" className="button-primary">
                    Signup
                  </button>
                  {error && <Error error={error} />}
                </div>
              </form>
            );
          }}
        </Mutation>
      </div>
    );
  }
}

export default Signup;
