import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useNotification } from '../../utils/hooks/useNotification';
import { useQueriesTodos } from '../../utils/hooks/useQueriesTodos';
import { UserStorage } from '../../utils/localStorageKeys';
import { Store } from '../../utils/store';
import { StyledDetails } from './styles/StyledDetails';
import { Tags } from './Tags';

interface Props {
  props: {
    showDetails: { isOpen: boolean; todoIndex: number };
    setShowDetails: React.Dispatch<React.SetStateAction<{ isOpen: boolean; todoIndex: number }>>;
  };
}

export const Details = ({ props: { showDetails, setShowDetails } }: Props) => {
  const statusMap = {
    next: 'Próximas',
    current: 'Em progresso',
    done: 'Finalizada',
  };

  const { listName } = useParams();
  const { todos } = useSelector((state: Store) => state.todos);
  const currentTodo = todos[showDetails.todoIndex] || { status: 'done' };
  const status = statusMap[currentTodo.status as keyof typeof statusMap];

  const [showConfirmButton, setShowConfirmButton] = useState(false);
  const { requestDeleteTodo } = useQueriesTodos();
  const { sendNotification } = useNotification();

  const deleteTodo = async () => {
    const userStorage = new UserStorage();
    const { email } = userStorage.readData();

    const { error } = await requestDeleteTodo({
      email,
      id: currentTodo.id,
      listName: listName || '',
    });

    if (error) return sendNotification('error', error);

    sendNotification('success', 'Sua tarefa foi excluida');
    setShowDetails({ isOpen: false, todoIndex: 0 });
  };

  return (
    <StyledDetails>
      <div className="tab">
        <button onClick={() => setShowDetails({ isOpen: false, todoIndex: 0 })} className="close">
          x
        </button>
      </div>

      <div className="details">
        <h1 className="task">{currentTodo.task}</h1>
        <span className="status">Status: {status}</span>

        <Tags />

        <div className="notes">
          <h2>Anotações</h2>
          <textarea placeholder="........." />
        </div>

        <div className="actions">
          <button>Salvar</button>
          {showConfirmButton || <button onClick={() => setShowConfirmButton(true)}>Deletar</button>}
          {showConfirmButton && (
            <button
              autoFocus={true}
              onBlur={() => setShowConfirmButton(false)}
              onClick={() => deleteTodo()}>
              Clique novamente para deletar sua tarefa, ou fora para cancelar.
            </button>
          )}
        </div>
      </div>
    </StyledDetails>
  );
};
