import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import PropTypes from "prop-types";

// apollo stuff
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

// custom components
import App from "./components/App";
import Navbar from "./components/shared/Navbar";
import Signup from "./components/auth/Signup";
import Signin from "./components/auth/Signin";
import withSession from "./components/withSession";
import Search from "./components/cologne/Search";
import AddCologne from "./components/cologne/AddCologne";
import Profile from "./components/profile/Profile";

// our apollo client
const client = new ApolloClient({
  uri: "http://localhost:4444/graphql",
  fetchOptions: {
    credentials: "include"
  },
  request: operation => {
    const token = localStorage.getItem("token");
    operation.setContext({
      headers: {
        authorization: token
      }
    });
  },
  onError: ({ networkError }) => {
    if (networkError) {
      console.log("Network Error", networkError);
    }
  }
});

const Root = ({ refetch, session }) => (
  <Router>
    <>
      <Navbar session={session} />
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/search" component={Search} />
        <Route path="/profile" component={Profile} />
        <Route path="/cologne/add" component={AddCologne} />
        <Route path="/signin" render={() => <Signin refetch={refetch} />} />
        <Route path="/signup" render={() => <Signup refetch={refetch} />} />
        <Redirect to="/" />
      </Switch>
    </>
  </Router>
);

Root.propTypes = {
  refetch: PropTypes.func,
  session: PropTypes.object
};

Root.defaultProps = {
  refetch: undefined,
  session: null
};

const RootWithSession = withSession(Root);

ReactDOM.render(
  <ApolloProvider client={client}>
    <RootWithSession />
  </ApolloProvider>,
  document.getElementById("root")
);
