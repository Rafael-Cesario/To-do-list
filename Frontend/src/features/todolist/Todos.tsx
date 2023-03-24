import { useNotification } from '../../utils/hooks/useNotification';
import { useQueriesTodos } from '../../utils/hooks/useQueriesTodos';
import { CreateTodo } from './createTodo';
import { StyledTodos } from './styles/StyledTodos';

export const Todos = () => {
  const { todos, error } = useQueriesTodos();
  const { sendNotification } = useNotification();

  if (error) sendNotification('error', error.message);

  return (
    <StyledTodos>
      <CreateTodo />

      <div className="todos">
        {todos.length < 1 && <p>Suas tarefas apareceram aqui.</p>}

        {todos.map((todo, index) => (
          <div key={todo.task + index} className={`todo ${todo.status}`} data-id={todo.id}>
            <div className={`status`} data-status={todo.status} />
            <button className={`task`}>{todo.task}</button>
          </div>
        ))}
      </div>
    </StyledTodos>
  );
};
