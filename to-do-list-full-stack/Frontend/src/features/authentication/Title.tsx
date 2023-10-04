import { StyledTitle } from "./styles/StyledTitle";

export const Title = () => {
  return (
    <StyledTitle>
      <img src="/icons/task.png" alt="Task icons created by Freepik - Flaticon" title="Task icons created by Freepik - Flaticon" width={70} />

      <div className="title">
        <h1>To do list</h1>
        <p>Crie suas listas, suas tarefas e tags.</p>
      </div>
    </StyledTitle>
  );
};
