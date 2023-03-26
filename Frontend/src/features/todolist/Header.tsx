import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { StyledHeader } from './styles/StyledHeader';
import { Store } from '../../utils/store';
import { Configs } from './configs';

export const Header = () => {
  const { listName } = useParams();

  const { todos } = useSelector((state: Store) => state.todos);
  const totalTodos = todos.length;

  return (
    <StyledHeader>
      <div>
        <h1 className="title">{listName}</h1>
        <span className="total-words">
          {totalTodos} {totalTodos > 1 ? 'Tarefas' : 'Tarefa'}
        </span>
      </div>

      <div className="menu">
        <Link to={'/index'}>Listas</Link>
        <Configs />
        <input className="search" type="text" placeholder="Busque por uma tag, tarefa, ou status" />
      </div>
    </StyledHeader>
  );
};
