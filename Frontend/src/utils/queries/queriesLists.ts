/* eslint-disable @typescript-eslint/no-explicit-any */
import { client } from '../../client';
import { errors } from '../requestErrors';
import { CREATE_LIST, InputCreateList } from './interfaces/interfaceQueriesLists';

export class QueriesLists {
  async createList(createList: InputCreateList) {
    try {
      const { data } = await client.mutate({ mutation: CREATE_LIST, variables: { createList } });
      return { message: data?.createList.message };
    } catch (error: any) {
      console.log({ error: error.message });
      const errorMessage = errors[error.message as keyof typeof errors];
      return { error: errorMessage ?? errors.default };
    }
  }
}
