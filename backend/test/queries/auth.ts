import gql from 'graphql-tag';

class AuthQueries {
  readonly LOGIN = gql`
    mutation Login($loginData: LoginInput!) {
      login(loginData: $loginData) {
        email
        token
        userID
      }
    }
  `;
}

export const authQueries = new AuthQueries();
