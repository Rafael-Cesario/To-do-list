/* eslint-disable @typescript-eslint/no-explicit-any */
import { client } from '../../../client';
import { InputCreateUser, CREATE_USER } from '../interfaces/interfacesQueriesUser';

// todo > Implement interface Errors
// interface IErrors {
//   default: string;
//   duplicatedUser: string;
// }

const errors = {
  default: 'Um erro inesperado ocorreu, por favor recarregue a página e tente novamente',
  'Failure: This user already exist': 'Este usuario já existe',
};

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
}
