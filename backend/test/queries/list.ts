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

  readonly GET_LISTS = gql`
    query GetLists($getListData: GetListInput!) {
      getLists(getListData: $getListData) {
        id
        name
        userID
        tasks {
          createdAt
          description
          id
          listID
          status
          title
          tags {
            color
            id
            name
            taskId
          }
        }
      }
    }
  `;
}

export const listQueries = new ListQueries();
