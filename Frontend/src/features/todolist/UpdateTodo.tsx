import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useNotification } from '../../utils/hooks/useNotification';
import { useQueriesTodos } from '../../utils/hooks/useQueriesTodos';
import { ITodoModel } from '../../utils/interfaces/interfaceQueriesTodos';
import { UserStorage } from '../../utils/localStorageKeys';
import { sliceTodos } from './utils/sliceTodos';

interface Props {
  props: {
    todo: ITodoModel;
    setShowDetails: (newState: { isOpen: boolean; todoIndex: number }) => void;
  };
}

export const UpdateTodo = ({ props: { todo, setShowDetails } }: Props) => {
  const { requestUpdateTodo } = useQueriesTodos();
  const { sendNotification } = useNotification();
  const { listName } = useParams();
  const dispatch = useDispatch();

  const updateTodo = async () => {
    const storage = new UserStorage();
    const { email } = storage.readData();
    const { id, status, tags, task, notes } = todo;

    const { error } = await requestUpdateTodo({
      listName: listName || '',
      notes: notes || '...',
      email,
      id,
      status,
      tags,
      task,
    });

    if (error) return sendNotification('error', error);

    dispatch(sliceTodos.actions.updateTodo({ todo: todo }));
    setShowDetails({ isOpen: false, todoIndex: 0 });
    sendNotification('success', 'Tarefa Salva');
  };

  return <button onClick={() => updateTodo()}>Salvar</button>;
};
