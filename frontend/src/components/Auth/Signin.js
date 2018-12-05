import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

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
  static propTypes = {
    history: PropTypes.object.isRequired,
    refetch: PropTypes.func.isRequired
  };

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
    const { history, refetch } = this.props;
    signinUser().then(async ({ data }) => {
      localStorage.setItem("token", data.signinUser.token);
      await refetch();
      this.clearForm();
      history.push("/");
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
      <div>
        <Mutation
          mutation={SIGNIN_USER_MUTATION}
          variables={{ username, password }}
        >
          {(signinUser, { data, loading, error }) => {
            if (loading) return <div>Loading...</div>;
            // if (error) return <div>Error {error.message}</div>;

            return (
              <div id="wrapper">
                <div id="main" className="alt">
                  <section id="one">
                    <div className="inner">
                      <div className="grid-wrapper">
                        <div className="col-6">
                          <h2 className="align-center">Signin</h2>
                          <form
                            className="form"
                            onSubmit={event =>
                              this.handleSubmit(event, signinUser)
                            }
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
                        </div>
                        <div className="col-6">
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Eveniet distinctio sed nihil error nostrum
                            earum quod debitis molestias voluptatum sunt
                            pariatur, ratione eaque architecto rerum iusto alias
                            repudiandae nesciunt excepturi?
                          </p>
                        </div>
                      </div>
                    </div>
                  </section>
                  <section id="two">
                    <div className="inner">
                      <div className="grid-wrapper">
                        <div className="col-3">
                          <p>
                            Lorem ipsum dolor, sit amet consectetur adipisicing
                            elit. Nesciunt consequuntur, repellendus tempora,
                            quod odit inventore incidunt temporibus amet ullam
                            molestias, ipsam consequatur molestiae ut nobis
                            atque eos dolorem odio voluptatibus.
                          </p>
                        </div>
                        <div className="col-3">
                          <p>
                            Reiciendis iure aut maiores maxime quidem, quo, modi
                            tempore odio corporis cupiditate culpa voluptatibus
                            incidunt nemo sint voluptate voluptatum ipsam
                            quibusdam ratione neque necessitatibus iste dolorum
                            natus? Suscipit, a distinctio.
                          </p>
                        </div>
                        <div className="col-3">
                          <p>
                            Obcaecati exercitationem in quos iste assumenda!
                            Pariatur, distinctio perferendis aspernatur eius
                            reprehenderit provident unde deserunt ut laboriosam
                            odio iure quasi, sit est amet consequuntur error hic
                            nihil ratione praesentium inventore.
                          </p>
                        </div>
                        <div className="col-3">
                          <p>
                            Obcaecati exercitationem in quos iste assumenda!
                            Pariatur, distinctio perferendis aspernatur eius
                            reprehenderit provident unde deserunt ut laboriosam
                            odio iure quasi, sit est amet consequuntur error hic
                            nihil ratione praesentium inventore.
                          </p>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            );
          }}
        </Mutation>
      </div>
    );
  }
}

export default withRouter(Signin);
