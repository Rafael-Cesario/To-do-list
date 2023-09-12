import gql from 'graphql-tag';

class UserQueries {
  readonly CREATE_USER = gql`
    mutation CreateUser($createUserData: CreateUserInput!) {
      createUser(createUserData: $createUserData) {
        createdAt
        email
        name
        id
        password
      }
    }
  `;
}

export const userQueries = new UserQueries();
