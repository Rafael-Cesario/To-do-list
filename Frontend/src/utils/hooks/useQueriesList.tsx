/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery } from '@apollo/client';
import { errors } from '../requestErrors';
import { CREATE_LIST, InputCreateList, READ_LISTS } from '../interfaces/interfaceQueriesLists';
import { useDispatch, useSelector } from 'react-redux';
import { Store } from '../store';
import { useEffect, useState } from 'react';
import { sliceLists } from '../../features/index/utils/sliceLists';

export const useQueriesList = () => {
  const dispatch = useDispatch();
  const [mutationCreateList] = useMutation(CREATE_LIST);
  const [email, setEmail] = useState('');
  const { lists } = useSelector((state: Store) => state.lists);
  const { data, loading, error } = useQuery(READ_LISTS, { variables: { email } });

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem('user') || '');
    setEmail(storage.email);
  }, []);

  useEffect(() => {
    const lists = data?.readLists.lists || [];
    dispatch(sliceLists.actions.loadLists({ lists }));
  }, [data]);

  const requestCreateList = async (createList: InputCreateList) => {
    try {
      const { data } = await mutationCreateList({ variables: { createList } });
      return { message: data?.createList.message };
    } catch (error: any) {
      console.log({ error: error.message });
      const errorMessage = errors[error.message as keyof typeof errors];
      return { error: errorMessage ?? errors.default };
    }
  };

  return { lists, loading, error, requestCreateList };
};
