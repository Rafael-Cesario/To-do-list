import { Details } from '../features/todolist/Details';
import { Header } from '../features/todolist/Header';
import { Todos } from '../features/todolist/Todos';
import { StyledTodoList } from '../styles/StyledTodoList';
import { Notification } from '../features/authentication/Notification';
import { useNotification } from '../utils/hooks/useNotification';

const TodoList = () => {
  const { notification } = useNotification();

  return (
    <StyledTodoList>
      <Header />
      <Todos />
      <Details />

      {notification.isOpen && <Notification />}
    </StyledTodoList>
  );
};

export default TodoList;
