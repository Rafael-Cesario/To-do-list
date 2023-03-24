import { useParams } from 'react-router-dom';
import { StyledHeader } from './styles/StyledHeader';

export const Header = () => {
  const { listName } = useParams();

  // todo > get the total of todos
  const totalTodos = 120;

  return (
    <StyledHeader>
      <div>
        <h1 className="title">{listName}</h1>
        <span className="total-words">{totalTodos} Tarefas</span>
      </div>

      <div className='menu'>
        <button className="configs">Configs</button>
        <input className='search' type="text" placeholder="Busque por uma tag, tarefa, ou status" />
      </div>
    </StyledHeader>
  );
};
