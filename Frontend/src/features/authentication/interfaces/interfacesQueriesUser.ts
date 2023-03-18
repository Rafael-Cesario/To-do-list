import { gql } from '@apollo/client';

export interface InputCreateUser {
  name: string;
  email: string;
  password: string;
}

export interface InputUpdateUser {
  email: string;
  update: {
    email?: string;
    name?: string;
    password?: string;
  };
}

export interface InputLogin {
  email: string;
  password: string;
}

export const CREATE_USER = gql`
  mutation CreateUser($createUser: InputCreateUser!) {
    createUser(createUser: $createUser) {
      message
    }
  }
`;

export const READ_USER = gql`
  query ReadUser($email: String!) {
    readUser(email: $email) {
      email
      name
      password
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($updateUser: InputUpdateUser!) {
    updateUser(updateUser: $updateUser) {
      message
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($email: String!) {
    deleteUser(email: $email) {
      message
    }
  }
`;

export const LOGIN = gql`
  query Login($login: InputLogin!) {
    login(login: $login) {
      token
      message
    }
  }
`;
