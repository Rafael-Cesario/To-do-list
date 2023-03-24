import { StyledCreateTodo } from './styles/StyledCreateTodo';

export const CreateTodo = () => {
  return (
    <StyledCreateTodo>
      <input type="text" className="input-todo" placeholder="..............." />
      <button className="submit-todo">Criar tarefa</button>
    </StyledCreateTodo>
  );
};
