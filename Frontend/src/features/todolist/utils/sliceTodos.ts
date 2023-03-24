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

    loadTodos: (state, action: { payload: { todos: ITodoModel[] } }) => {
      state.todos = action.payload.todos;
    },
  },
});
