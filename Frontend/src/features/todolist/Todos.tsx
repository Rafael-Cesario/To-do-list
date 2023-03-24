import { CreateTodo } from './createTodo';
import { StyledTodos } from './styles/StyledTodos';

export const Todos = () => {
  const todos: { task: string; status: string }[] = [];

  return (
    <StyledTodos>
      <CreateTodo />

      <div className="todos">
        {todos.length || <p>Suas tarefas apareceram aqui.</p>}

        {todos.map((todo, index) => (
          <div key={todo.task + index} className={`todo ${todo.status}`}>
            <button className={`status`} data-status={todo.status} />
            <p className={`task`}>{todo.task}</p>
          </div>
        ))}
      </div>
    </StyledTodos>
  );
};
