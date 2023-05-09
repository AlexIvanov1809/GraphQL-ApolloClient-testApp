import { gql } from '@apollo/client';

const CREATE_USER = gql`
  mutation AddUser($username: String!, $age: Int!) {
    addUser(username: $username, age: $age) {
      id
      username
      age
    }
  }
`;
const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $username: String!, $age: Int!) {
    updateUser(id: $id, username: $username, age: $age) {
      id
      username
      age
    }
  }
`;
const REMOVE_USER = gql`
  mutation RemoveUser($id: ID!) {
    removeUser(id: $id) {
      id
    }
  }
`;

export { CREATE_USER, UPDATE_USER, REMOVE_USER };
