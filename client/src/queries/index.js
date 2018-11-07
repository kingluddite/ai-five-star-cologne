import { gql } from "apollo-boost";

// Mutations
export const GET_ALL_COLOGNES = gql`
  query GET_ALL_COLOGNES {
    getAllColognes {
      scentName
      scentPrice
      description
      createdDate
      likes
    }
  }
`;

export const SIGNUP_USER_MUTATION = gql`
  mutation SIGNUP_USER_MUTATION(
    $username: String!
    $email: String!
    $password: String!
  ) {
    signupUser(username: $username, email: $email, password: $password) {
      token
    }
  }
`;
