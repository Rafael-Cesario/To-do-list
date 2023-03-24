import { gql } from '@apollo/client';

export interface InputCreateList {
  email: string;
  listName: string;
}

export interface InputRenameList {
  oldName: string;
  newName: string;
  email: string;
}

export interface InputDeleteList {
  listName: string;
  email: string;
}

export const CREATE_LIST = gql`
  mutation CreateList($createList: InputCreateList!) {
    createList(createList: $createList) {
      message
    }
  }
`;
export const READ_LISTS = gql`
  query ReadLists($email: String!) {
    readLists(email: $email) {
      lists
    }
  }
`;
export const RENAME_LIST = gql`
  mutation RenameList($renameList: InputRenameList!) {
    renameList(renameList: $renameList) {
      message
    }
  }
`;
export const DELETE_LIST = gql`
  mutation DeleteList($deleteList: InputDeleteList!) {
    deleteList(deleteList: $deleteList) {
      message
    }
  }
`;
