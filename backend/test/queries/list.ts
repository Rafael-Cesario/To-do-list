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
            taskID
          }
        }
      }
    }
  `;

  readonly UPDATE_LIST = gql`
    mutation UpdateList($updateListData: UpdateListInput!) {
      updateList(updateListData: $updateListData) {
        id
        name
        tasks {
          tags {
            color
            id
            name
            taskID
          }
          createdAt
          description
          id
          listID
          status
          title
        }
        userID
      }
    }
  `;

  readonly DELETE_LIST = gql`
    mutation DeleteList($deleteListData: DeleteListInput!) {
      deleteList(deleteListData: $deleteListData)
    }
  `;
}

export const listQueries = new ListQueries();
