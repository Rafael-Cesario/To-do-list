import { gql } from '@apollo/client';

export interface ITodoModel {
  id: string;
  status: string;
  tags: string[];
  task: string;
  notes?: string;
}

export interface InputCreateTodo {
  email: string;
  listName: string;
  id: string;
  task: string;
}

export interface InputReadTodos {
  email: string;
  listName: string;
}

export interface InputRenameTodo {
  email: string;
  listName: string;
  id: string;
  newTask: string;
}

export interface InputDeleteTodo {
  email: string;
  listName: string;
  id: string;
}

export interface InputUpdateStatus {
  email: string;
  listName: string;
  id: string;
  newStatus: string;
}

export interface InputUpdateTodo {
  email: string;
  listName: string;
  id: string;
  task: string;
  status: string;
  tags: string[];
  notes: string;
}

export const CREATE_TODO = gql`
  mutation CreateTodo($createTodo: InputCreateTodo!) {
    createTodo(createTodo: $createTodo) {
      message
    }
  }
`;

export const READ_TODOS = gql`
  query ReadTodos($readTodos: InputReadTodos!) {
    readTodos(readTodos: $readTodos) {
      id
      task
      tags
      status
      notes
    }
  }
`;

export const RENAME_TODO = gql`
  mutation RenameTodo($renameTodo: InputRenameTodo!) {
    renameTodo(renameTodo: $renameTodo) {
      message
    }
  }
`;

export const DELETE_TODO = gql`
  mutation DeleteTodo($deleteTodo: InputDeleteTodo!) {
    deleteTodo(deleteTodo: $deleteTodo) {
      message
    }
  }
`;

export const UPDATE_STATUS = gql`
  mutation UpdateStatus($updateStatus: InputUpdateStatus!) {
    updateStatus(updateStatus: $updateStatus) {
      message
    }
  }
`;

export const UPDATE_TODO = gql`
  mutation UpdateTodo($updateTodo: InputUpdateTodo!) {
    updateTodo(updateTodo: $updateTodo) {
      id
      task
      status
      tags
      notes
    }
  }
`;
