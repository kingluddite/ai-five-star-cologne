import React, { Component } from "react";

// graphql
import { Query } from "react-apollo";
import { GET_ALL_COLOGNES } from "../queries";

// styles
import "../assets/scss/main.scss";

class App extends Component {
  render() {
    return (
      <div id="wrapper">
        <h1>Home</h1>
        <Query query={GET_ALL_COLOGNES}>
          {({ data, loading, error }) => {
            if (loading) return <div>Loading...</div>;
            if (error) return <div>Error</div>;
            console.log(data);

            return <p>Colognes</p>;
          }}
        </Query>
      </div>
    );
  }
}

export default App;
