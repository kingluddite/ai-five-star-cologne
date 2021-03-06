import React from "react";

// GraphQL
import { Query } from "react-apollo";
import { GET_CURRENT_USER_QUERY } from "../queries";

const withSession = Component => props => (
  <Query query={GET_CURRENT_USER_QUERY}>
    {({ data, loading, refetch }) => {
      if (loading) return null;
      console.log(data);

      return <Component {...props} refetch={refetch} session={data} />;
    }}
  </Query>
);

export default withSession;
