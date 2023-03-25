/* eslint-disable @typescript-eslint/no-explicit-any */
import { sliceTodos } from '../../features/todolist/utils/sliceTodos';
import { useMutation, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { localStorageKeys } from '../localStorageKeys';
import { errors } from '../requestErrors';
import { Store } from '../store';
import {
  CREATE_TODO,
  READ_TODOS,
  InputReadTodos,
  ITodoModel,
  InputDeleteTodo,
  DELETE_TODO,
} from '../interfaces/interfaceQueriesTodos';

export const useQueriesTodos = () => {
  const { todos } = useSelector((state: Store) => state.todos);
  const { listName } = useParams();
  const [email, setEmail] = useState('');

  const { data, error, loading } = useQuery<
    { readTodos: ITodoModel[] },
    { readTodos: InputReadTodos }
  >(READ_TODOS, { variables: { readTodos: { email, listName: listName ?? '' } } });

  const dispatch = useDispatch();
  const [mutationCreateTodo] = useMutation(CREATE_TODO);
  const [mutationDeleteTodo] = useMutation(DELETE_TODO);

  const requestCreateTodo = async ({ id, task }: { id: string; task: string }) => {
    try {
      const createTodo = { id, task, email, listName };
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

  const requestDeleteTodo = async (id: string) => {
    try {
      const deleteTodo: InputDeleteTodo = { email, listName: listName || '', id };
      const { data } = await mutationDeleteTodo({ variables: { deleteTodo } });

      dispatch(sliceTodos.actions.deleteTodo({ id }));

      return { data };
    } catch (error: any) {
      console.log({ error: error.message });
      const errorMessage = errors[error.message as keyof typeof errors];
      return { error: errorMessage ?? errors.default };
    }
  };

  useEffect(() => {
    const storage: { email: string } = JSON.parse(
      localStorage.getItem(localStorageKeys.user) || ''
    );

    setEmail(storage.email);
  }, []);

  useEffect(() => {
    const todos = data?.readTodos || [];
    dispatch(sliceTodos.actions.loadTodos({ todos }));
  }, [data]);

  return {
    todos,
    loading,
    error,
    requestCreateTodo,
    requestDeleteTodo,
  };
};
