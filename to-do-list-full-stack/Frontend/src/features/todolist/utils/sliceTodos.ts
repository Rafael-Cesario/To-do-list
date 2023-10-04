import { createSlice } from '@reduxjs/toolkit';
import { ITodoModel } from '../../../utils/interfaces/interfaceQueriesTodos';

const initialState: { todos: ITodoModel[] } = {
  todos: [],
};

export const sliceTodos = createSlice({
  name: 'Todos',
  initialState,
  reducers: {
    createTodo: (state, action: { payload: { todo: ITodoModel } }) => {
      state.todos.push(action.payload.todo);
    },

    deleteTodo: (state, action: { payload: { id: string } }) => {
      const todoIndex = state.todos.findIndex((todo) => todo.id === action.payload.id);
      state.todos.splice(todoIndex, 1);
    },

    loadTodos: (state, action: { payload: { todos: ITodoModel[] } }) => {
      state.todos = action.payload.todos;
    },

    updateTodo: (state, action: { payload: { todo: ITodoModel } }) => {
      const todoIndex = state.todos.findIndex((todo) => todo.id === action.payload.todo.id);
      state.todos[todoIndex] = action.payload.todo;
    },
  },
});
