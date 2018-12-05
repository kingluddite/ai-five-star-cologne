import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import PropTypes from "prop-types";

// MORE CODE

// custom components
import Navbar from "./components/Navbar";
import App from "./components/App";
import Signin from "./components/Auth/Signin";
import Signup from "./components/Auth/Signup";
import withSession from "./components/withSession";
import Elements from "./components/Elements";
import Footer from "./components/Footer";

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

const Root = ({ refetch }) => (
  <Router>
    <div id="wrapper">
      <Navbar />
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/signin" render={() => <Signin refetch={refetch} />} />
        <Route path="/signup" render={() => <Signup refetch={refetch} />} />
        <Route path="/elements" component={Elements} />
        <Redirect to="/" />
      </Switch>
      <Footer />
    </div>
  </Router>
);

Root.propTypes = {
  refetch: PropTypes.func
  // session: PropTypes.object,
};

Root.defaultProps = {
  refetch: undefined
  // session: null,
};

const RootWithSession = withSession(Root);

ReactDOM.render(
  <ApolloProvider client={client}>
    <RootWithSession />
  </ApolloProvider>,
  document.getElementById("root")
);
