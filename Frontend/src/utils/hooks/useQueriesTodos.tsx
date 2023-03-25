/* eslint-disable @typescript-eslint/no-explicit-any */
import { sliceTodos } from '../../features/todolist/utils/sliceTodos';
import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { errors } from '../requestErrors';
import {
  CREATE_TODO,
  InputDeleteTodo,
  DELETE_TODO,
  InputCreateTodo,
} from '../interfaces/interfaceQueriesTodos';

export const useQueriesTodos = () => {
  const dispatch = useDispatch();
  const [mutationCreateTodo] = useMutation(CREATE_TODO);
  const [mutationDeleteTodo] = useMutation(DELETE_TODO);

  const requestCreateTodo = async ({ email, id, listName, task }: InputCreateTodo) => {
    try {
      const createTodo = { email, id, listName, task };
      const { data } = await mutationCreateTodo({ variables: { createTodo } });

      const todo = { id, task, tags: [], status: 'next' };
      dispatch(sliceTodos.actions.createTodo({ todo }));

      return { data };
    } catch (error: any) {
      console.log({ error: error.message });
      const errorMessage = errors[error.message as keyof typeof errors];
      return { error: errorMessage ?? errors.default };
    }
  };

  const requestDeleteTodo = async ({ email, id, listName }: InputDeleteTodo) => {
    try {
      const deleteTodo = { email, listName, id };
      const { data } = await mutationDeleteTodo({ variables: { deleteTodo } });

      dispatch(sliceTodos.actions.deleteTodo({ id }));

      return { data };
    } catch (error: any) {
      console.log({ error: error.message });
      const errorMessage = errors[error.message as keyof typeof errors];
      return { error: errorMessage ?? errors.default };
    }
  };

  return {
    requestCreateTodo,
    requestDeleteTodo,
  };
};
