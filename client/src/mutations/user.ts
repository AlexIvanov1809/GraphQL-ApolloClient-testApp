import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation AddUser($username: String!, $age: Int!) {
    addUser(username: $username, age: $age) {
      id
      username
      age
    }
  }
`;
