import gql from 'graphql-tag';

class ListQueries {
  readonly CREATE_LIST = gql`
    mutation CreateList($createListData: CreateListInput!) {
      createList(createListData: $createListData) {
        id
        userID
        name
      }
    }
  `;
}

export const listQueries = new ListQueries();
