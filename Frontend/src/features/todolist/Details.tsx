import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useNotification } from '../../utils/hooks/useNotification';
import { useQueriesTodos } from '../../utils/hooks/useQueriesTodos';
import { ITodoModel } from '../../utils/interfaces/interfaceQueriesTodos';
import { UserStorage } from '../../utils/localStorageKeys';
import { Store } from '../../utils/store';
import { DeleteTodo } from './DeleteTodo';
import { StyledDetails } from './styles/StyledDetails';
import { Tags } from './Tags';
import { sliceTodos } from './utils/sliceTodos';

interface Props {
  props: {
    showDetails: { isOpen: boolean; todoIndex: number };
    setShowDetails: React.Dispatch<React.SetStateAction<{ isOpen: boolean; todoIndex: number }>>;
  };
}

export const Details = ({ props: { showDetails, setShowDetails } }: Props) => {
  const { todos } = useSelector((state: Store) => state.todos);
  const [todo, setTodo] = useState<ITodoModel>(todos[showDetails.todoIndex]);

  const { requestUpdateTodo } = useQueriesTodos();
  const { sendNotification } = useNotification();
  const { listName } = useParams();
  const dispatch = useDispatch();

  const updateTodo = async () => {
    const storage = new UserStorage();
    const { email } = storage.readData();
    const { id, status, tags, task } = todo;

    const { error } = await requestUpdateTodo({
      listName: listName || '',
      email,
      id,
      status,
      tags,
      task,
    });

    if (error) return sendNotification('error', error);

    dispatch(sliceTodos.actions.updateTodo({ todo: todo }));
    sendNotification('success', 'Tarefa Salva');
  };

  return (
    <StyledDetails>
      <div className="tab">
        <button onClick={() => setShowDetails({ isOpen: false, todoIndex: 0 })} className="close">
          x
        </button>
      </div>

      <div className="details">
        <input
          type="text"
          className="task"
          value={todo.task}
          onChange={(e) => setTodo({ ...todo, task: e.target.value })}
        />

        <span>Status: </span>
        <select
          name="status"
          className="status"
          value={todo.status}
          onChange={(e) => setTodo({ ...todo, status: e.target.value })}>
          <option value="next">Próximas</option>
          <option value="current">Em progresso</option>
          <option value="done">Finalizadas</option>
        </select>

        <Tags />

        <div className="notes">
          <h2>Anotações</h2>
          <textarea placeholder="........." />
        </div>

        <div className="actions">
          <button onClick={() => updateTodo()}>Salvar</button>
          <DeleteTodo props={{ id: todo.id, setShowDetails }} />
        </div>
      </div>
    </StyledDetails>
  );
};
