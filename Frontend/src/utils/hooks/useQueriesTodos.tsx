/* eslint-disable @typescript-eslint/no-explicit-any */
import { sliceTodos } from '../../features/todolist/utils/sliceTodos';
import { useMutation, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { CREATE_TODO, READ_TODOS, InputReadTodos, ITodoModel } from '../interfaces/interfaceQueriesTodos';
import { localStorageKeys } from '../localStorageKeys';
import { errors } from '../requestErrors';
import { Store } from '../store';

export const useQueriesTodos = () => {
  const [email, setEmail] = useState('');
  const { listName } = useParams();
  const [mutationCreateTodo] = useMutation(CREATE_TODO);

  const { todos } = useSelector((state: Store) => state.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    const storage: { email: string } = JSON.parse(localStorage.getItem(localStorageKeys.user) || '');
    setEmail(storage.email);
  }, []);

  const { data, error, loading } = useQuery<{ readTodos: ITodoModel[] }, { readTodos: InputReadTodos }>(READ_TODOS, {
    variables: {
      readTodos: {
        email,
        listName: listName ?? '',
      },
    },
  });

  useEffect(() => {
    const todos = data?.readTodos || [];
    dispatch(sliceTodos.actions.loadTodos({ todos }));
  }, [data]);

  const requestCreateTodo = async (createTodo: { id: string; task: string }) => {
    try {
      const { data } = await mutationCreateTodo({
        variables: { createTodo: { ...createTodo, email, listName } },
      });

      dispatch(
        sliceTodos.actions.createTodo({
          todo: { ...createTodo, tags: [], status: 'next' },
        })
      );

      return { data };
    } catch (error: any) {
      console.log({ error: error.message });
      const errorMessage = errors[error.message as keyof typeof errors];
      return { error: errorMessage ?? errors.default };
    }
  };

  return { requestCreateTodo, error, loading, todos };
};
