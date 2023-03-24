/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CREATE_TODO, READ_TODOS, InputReadTodos, ITodoModel } from '../interfaces/interfaceQueriesTodos';
import { localStorageKeys } from '../localStorageKeys';
import { errors } from '../requestErrors';

export const useQueriesTodos = () => {
  const [email, setEmail] = useState('');
  const { listName } = useParams();
  const [mutationCreateTodo] = useMutation(CREATE_TODO);

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

  const requestCreateTodo = async (createTodo: { id: string; task: string }) => {
    try {
      const { data } = await mutationCreateTodo({ variables: { createTodo: { ...createTodo, email, listName } } });
      return { data };
    } catch (error: any) {
      console.log({ error: error.message });
      const errorMessage = errors[error.message as keyof typeof errors];
      return { error: errorMessage ?? errors.default };
    }
  };

  return { requestCreateTodo, todos: data?.readTodos ?? [], error, loading };
};
