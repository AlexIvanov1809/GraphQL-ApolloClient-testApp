import { gql } from '@apollo/client';

export const GET_ALL_USERS = gql`
  query {
    getAllUsers {
      id
      username
      age
      posts {
        id
        title
      }
    }
  }
`;

export const GET_ONE_USER = gql`
  query getOneUser($id: ID!) {
    getOneUser(id: $id) {
      id
      username
      age
    }
  }
`;
