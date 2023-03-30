import { useEffect, useState } from 'react';
import { Notification } from '../features/authentication/Notification';
import { CreateList } from '../features/index/CreateList';
import { Header } from '../features/index/Header';
import { Lists } from '../features/index/Lists';
import { StyledIndex } from '../features/index/styles/StyledIndex';
import { useNotification } from '../utils/hooks/useNotification';
import { useTheme } from '../utils/hooks/useTheme';

const Index = () => {
  const { notification } = useNotification();
  const [showCreateNewList, setShowCreateNewList] = useState(false);
  const { loadTheme } = useTheme();

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
