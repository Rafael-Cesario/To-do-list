import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Notification } from '../features/authentication/Notification';
import { CreateList } from '../features/index/CreateList';
import { Header } from '../features/index/Header';
import { Lists } from '../features/index/Lists';
import { StyledIndex } from '../features/index/styles/StyledIndex';
import { TypeThemeNames } from '../styles/themes';
import { useNotification } from '../utils/hooks/useNotification';
import { localStorageKeys } from '../utils/localStorageKeys';
import { sliceTheme } from '../utils/slices/sliceTheme';

const Index = () => {
  const { notification } = useNotification();
  const [showCreateNewList, setShowCreateNewList] = useState(false);
  const dispatch = useDispatch();

  const loadTheme = () => {
    const themeName = localStorage.getItem(localStorageKeys.theme) as TypeThemeNames;
    dispatch(sliceTheme.actions.changeTheme({ newTheme: themeName || 'black' }));
  };

  useEffect(() => {
    loadTheme();
  }, []);

  return (
    <StyledIndex>
      {notification.isOpen && <Notification />}
      <Header props={{ showCreateNewList, setShowCreateNewList }} />
      {showCreateNewList && <CreateList props={{ setShowCreateNewList }} />}
      <Lists />
    </StyledIndex>
  );
};

export default Index;
