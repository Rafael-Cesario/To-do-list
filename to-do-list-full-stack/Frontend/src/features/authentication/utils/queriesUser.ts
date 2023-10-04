/* eslint-disable @typescript-eslint/no-explicit-any */
import { errors } from '../../../utils/requestErrors';
import { client } from '../../../client';
import { InputCreateUser, CREATE_USER, InputLogin, LOGIN } from '../interfaces/interfacesQueriesUser';

// todo > Implement interface Errors
// interface IErrors {
//   default: string;
//   duplicatedUser: string;
//   invalidCredentials: string;
// }

export class QueriesUser {
  async createUser(createUser: InputCreateUser) {
    try {
      const { data } = await client.mutate({ mutation: CREATE_USER, variables: { createUser } });
      return { message: data?.createUser.message };
    } catch (error: any) {
      const errorMessage = errors[error.message as keyof typeof errors];
      return { error: errorMessage ?? errors.default };
    }
  }

  async login(login: InputLogin) {
    try {
      const { data } = await client.mutate({ mutation: LOGIN, variables: { login } });
      return { message: data?.login.message, token: data?.login.token };
    } catch (error: any) {
      const errorMessage = errors[error.message as keyof typeof errors];
      return { error: errorMessage ?? errors.default };
    }
  }
}
