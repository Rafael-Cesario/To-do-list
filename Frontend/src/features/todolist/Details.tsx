import { useState } from 'react';
import { useSelector } from 'react-redux';
import { ITodoModel } from '../../utils/interfaces/interfaceQueriesTodos';
import { Store } from '../../utils/store';
import { DeleteTodo } from './DeleteTodo';
import { StyledDetails } from './styles/StyledDetails';
import { Tags } from './Tags';
import { UpdateTodo } from './UpdateTodo';

interface Props {
  props: {
    showDetails: { isOpen: boolean; todoIndex: number };
    setShowDetails: React.Dispatch<React.SetStateAction<{ isOpen: boolean; todoIndex: number }>>;
  };
}

export const Details = ({ props: { showDetails, setShowDetails } }: Props) => {
  const { todos } = useSelector((state: Store) => state.todos);
  const [todo, setTodo] = useState<ITodoModel>(todos[showDetails.todoIndex]);

  return (
    <StyledDetails>
      <div className="tab">
        <button onClick={() => setShowDetails({ isOpen: false, todoIndex: 0 })} className="close">
          x
        </button>
      </div>

      <div className="details">
        <span>Status: </span>
        <select name="status" className="status" value={todo.status} onChange={(e) => setTodo({ ...todo, status: e.target.value })}>
          <option value="next">Próximas</option>
          <option value="current">Em progresso</option>
          <option value="done">Finalizadas</option>
        </select>

        <textarea className="task" value={todo.task} onChange={(e) => setTodo({ ...todo, task: e.target.value })} />

        <Tags props={{ todo, setTodo }} />

        <div className="notes">
          <h2>Anotações</h2>
          <textarea className="notes-area" value={todo.notes} placeholder="........." onChange={(e) => setTodo({ ...todo, notes: e.target.value })} />
        </div>

        <div className="actions">
          <UpdateTodo props={{ todo }} />
          <DeleteTodo props={{ id: todo.id, setShowDetails }} />
        </div>
      </div>
    </StyledDetails>
  );
};
