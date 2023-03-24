import { StyledTodos } from './styles/StyledTodos';

export const Todos = () => {
  const todos = [
    {
      task: 'lloremloremloremloremloremloremloremloremloremloremoloremloremloremloremloremloremre    loremloremloremloremloremloremlorem loremloremloremlorem loremloremloremloremloremlorem loremloremloremloremloremloremm loremloremloremloremloremloremlorem lorem lorem lorem loremlorem lorem lorem lorem lorem lorem ',
      status: 'done',
    },

    {
      task: 'lloremloremloremloremloremloremloremloremloremloremoloremloremloremloremloremloremre    loremloremloremloremloremloremlorem loremloremloremlorem loremloremloremloremloremlorem loremloremloremloremloremloremm loremloremloremloremloremloremlorem lorem lorem lorem loremlorem lorem lorem lorem lorem lorem ',
      status: 'current',
    },

    {
      task: 'lloremloremloremloremloremloremloremloremloremloremoloremloremloremloremloremloremre    loremloremloremloremloremloremlorem loremloremloremlorem loremloremloremloremloremlorem loremloremloremloremloremloremm loremloremloremloremloremloremlorem lorem lorem lorem loremlorem lorem lorem lorem lorem lorem ',
      status: 'next',
    },
  ];

  return (
    <StyledTodos>
      <div className="create-todo">
        <input type="text" className="input-todo" placeholder="..............." />
        <button className="submit-todo">Criar tarefa</button>
      </div>

      <div className="todos">
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
