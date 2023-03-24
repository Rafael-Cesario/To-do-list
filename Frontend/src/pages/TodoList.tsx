import { Details } from '../features/todolist/Details';
import { Header } from '../features/todolist/Header';
import { Todos } from '../features/todolist/Todos';
import { Notification } from '../features/authentication/Notification';
import { useNotification } from '../utils/hooks/useNotification';
import { useState } from 'react';
import { StyledTodoList } from '../styles/StyledTodoList';

const TodoList = () => {
  const { notification } = useNotification();
  const [showDetails, setShowDetails] = useState(false);

  return (
    <StyledTodoList>
      <Header />
      <Todos />

      {showDetails && <Details />}
      {notification.isOpen && <Notification />}
    </StyledTodoList>
  );
};

export default TodoList;
