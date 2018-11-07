import React, { Component } from "react";

// GraphQL
import { Mutation } from "react-apollo";
import { SIGNIN_USER_MUTATION } from "../../queries";

// custom components
import Error from "../Error";

const initialState = {
  username: "",
  password: ""
};

class Signin extends Component {
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
    this.setState({
      [name]: value
    });
  };

  handleSubmit = (event, signinUser) => {
    event.preventDefault();
    signinUser().then(data => {
      console.log(data.data.signinUser.token);
      this.clearForm();
    });
  };

  validateForm = () => {
    const { username, password } = this.state;
    const isInvalid = !username || !password;

    return isInvalid;
  };

  render() {
    const { username, password } = this.state;
    return (
      <div className="App">
        <h2 className="App">Signin</h2>
        <Mutation
          mutation={SIGNIN_USER_MUTATION}
          variables={{ username, password }}
        >
          {(signinUser, { data, loading, error }) => {
            if (loading) return <div>Loading...</div>;
            // if (error) return <div>Error {error.message}</div>;

            return (
              <form
                className="form"
                onSubmit={event => this.handleSubmit(event, signinUser)}
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
                <div>
                  <button
                    type="submit"
                    className="button-primary"
                    disabled={loading || this.validateForm()}
                  >
                    Signin
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

export default Signin;
