import { sliceTodos } from '../../features/todolist/utils/sliceTodos';
import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { errors } from '../requestErrors';
import {
  CREATE_TODO,
  InputDeleteTodo,
  DELETE_TODO,
  InputCreateTodo,
  InputUpdateTodo,
  UPDATE_TODO,
  ITodoModel,
} from '../interfaces/interfaceQueriesTodos';
import { UpdateCacheTodos } from '../apolloCache/cacheTodos';

interface ResponseUpdateTodo {
  updateTodo: ITodoModel;
}

interface VariablesUpdateTodo {
  updateTodo: InputUpdateTodo;
}

export const useQueriesTodos = () => {
  const updateCache = new UpdateCacheTodos();

  const dispatch = useDispatch();
  const [mutationCreateTodo] = useMutation(CREATE_TODO);
  const [mutationDeleteTodo] = useMutation(DELETE_TODO);
  const [mutationUpdateTodo] = useMutation<ResponseUpdateTodo, VariablesUpdateTodo>(UPDATE_TODO);

  const requestCreateTodo = async ({ email, id, listName, task }: InputCreateTodo) => {
    try {
      const createTodo = { email, id, listName, task };
      const { data } = await mutationCreateTodo({ variables: { createTodo } });

      await updateCache.onCreateTodo({ email, id, listName, task });

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

      await updateCache.onDeleteTodo({ email, listName, id });

      dispatch(sliceTodos.actions.deleteTodo({ id }));

      return { data };
    } catch (error: any) {
      console.log({ error: error.message });
      const errorMessage = errors[error.message as keyof typeof errors];
      return { error: errorMessage ?? errors.default };
    }
  };

  const requestUpdateTodo = async (updateTodo: InputUpdateTodo) => {
    try {
      const { data } = await mutationUpdateTodo({ variables: { updateTodo } });

      await updateCache.onUpdateTodo(updateTodo);

      const { id, task, tags, status, notes } = updateTodo;
      dispatch(sliceTodos.actions.updateTodo({ todo: { id, task, tags, status, notes } }));

      return { data: data?.updateTodo };
    } catch (error: any) {
      console.log({ error: error.message });
      const errorMessage = errors[error.message as keyof typeof errors] || errors.default;
      return { error: errorMessage };
    }
  };

  return {
    requestUpdateTodo,
    requestCreateTodo,
    requestDeleteTodo,
  };
};
