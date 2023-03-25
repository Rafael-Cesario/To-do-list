import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNotification } from '../../utils/hooks/useNotification';
import { useQueriesTodos } from '../../utils/hooks/useQueriesTodos';
import { UserStorage } from '../../utils/localStorageKeys';

interface Props {
  props: {
    id: string;
    setShowDetails: (newState: { isOpen: boolean; todoIndex: number }) => void;
  };
}

export const DeleteTodo = ({ props: { id, setShowDetails } }: Props) => {
  const { listName } = useParams();
  const [showConfirmButton, setShowConfirmButton] = useState(false);
  const { requestDeleteTodo } = useQueriesTodos();
  const { sendNotification } = useNotification();

  // todo > Test
  const deleteTodo = async () => {
    const userStorage = new UserStorage();
    const { email } = userStorage.readData();

    const { error } = await requestDeleteTodo({
      id,
      email,
      listName: listName || '',
    });

    if (error) return sendNotification('error', error);

    sendNotification('success', 'Sua tarefa foi excluida');
    setShowDetails({ isOpen: false, todoIndex: 0 });
  };

  return (
    <>
      {showConfirmButton || <button onClick={() => setShowConfirmButton(true)}>Deletar</button>}
      {showConfirmButton && (
        <button
          autoFocus={true}
          onBlur={() => setShowConfirmButton(false)}
          onClick={() => deleteTodo()}>
          Clique novamente para deletar sua tarefa, ou fora para cancelar.
        </button>
      )}
    </>
  );
};
