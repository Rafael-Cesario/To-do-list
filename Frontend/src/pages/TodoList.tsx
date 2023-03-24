import { Details } from '../features/todolist/Details';
import { Header } from '../features/todolist/Header';
import { Todos } from '../features/todolist/Todos';
import { StyledTodoList } from '../styles/StyledTodoList';

const TodoList = () => {
  return (
    <StyledTodoList>
      <Header />
      <Todos />
      <Details />
    </StyledTodoList>
  );
};

export default TodoList;
