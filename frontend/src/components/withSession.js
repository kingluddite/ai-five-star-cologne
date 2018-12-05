import React from "react";

// GraphQL
import { Query } from "react-apollo";
import { GET_CURRENT_USER_QUERY } from "../queries";

const withSession = Component => props => (
  <Query query={GET_CURRENT_USER_QUERY}>
    {({ data, loading, refetch }) => {
      if (loading) return <p>Loading...</p>;
      console.log(data);

      return <Component {...props} refetch={refetch} />;
    }}
  </Query>
);

export default withSession;