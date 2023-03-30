import { Details } from '../features/todolist/Details';
import { Header } from '../features/todolist/Header';
import { Todos } from '../features/todolist/Todos';
import { Notification } from '../features/authentication/Notification';
import { useNotification } from '../utils/hooks/useNotification';
import { useEffect, useState } from 'react';
import { StyledTodoList } from '../styles/StyledTodoList';
import { useTheme } from '../utils/hooks/useTheme';

const TodoList = () => {
  const { notification } = useNotification();
  const [showDetails, setShowDetails] = useState({ isOpen: false, todoIndex: 0 });

  const { loadTheme } = useTheme();

  useEffect(() => {
    loadTheme();
  }, []);

  return (
    <StyledTodoList>
      <Header />
      <Todos props={{ setShowDetails, showDetails }} />

      {showDetails.isOpen && <Details props={{ setShowDetails, showDetails }} />}
      {notification.isOpen && <Notification />}
    </StyledTodoList>
  );
};

export default TodoList;
