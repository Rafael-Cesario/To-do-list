/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery } from '@apollo/client';
import { errors } from '../requestErrors';
import { CREATE_LIST, InputCreateList, InputRenameList, READ_LISTS, RENAME_LIST } from '../interfaces/interfaceQueriesLists';
import { useDispatch, useSelector } from 'react-redux';
import { Store } from '../store';
import { useEffect, useState } from 'react';
import { sliceLists } from '../../features/index/utils/sliceLists';

export const useQueriesList = () => {
  const [email, setEmail] = useState('');
  const { data, loading, error } = useQuery(READ_LISTS, { variables: { email } });

  const [mutationCreateList] = useMutation(CREATE_LIST);
  const [mutationRenameList] = useMutation(RENAME_LIST);

  const { lists } = useSelector((state: Store) => state.lists);
  const dispatch = useDispatch();

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
  const requestRenameList = async (renameList: InputRenameList) => {
    try {
      const { data } = await mutationRenameList({ variables: { renameList } });
      return { data };
    } catch (error: any) {
      console.log({ error: error.message });
      const errorMessage = errors[error.message as keyof typeof errors];
      return { error: errorMessage ?? errors.default };
    }
  };

  return { lists, loading, error, requestCreateList, requestRenameList };
};
