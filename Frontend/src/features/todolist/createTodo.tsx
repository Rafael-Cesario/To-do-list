import { useState } from 'react';
import { useNotification } from '../../utils/hooks/useNotification';
import { useQueriesTodos } from '../../utils/hooks/useQueriesTodos';
import { StyledCreateTodo } from './styles/StyledCreateTodo';
import { v4 as uuidV4 } from 'uuid';
import { localStorageKeys } from '../../utils/localStorageKeys';
import { useParams } from 'react-router-dom';

export const CreateTodo = () => {
  const { listName } = useParams();
  const [task, setTask] = useState('');
  const { sendNotification } = useNotification();
  const { requestCreateTodo } = useQueriesTodos();

  const createTodo = async () => {
    if (!task) return sendNotification('error', 'Não posso criar uma tarefa vazia');

    const storage = localStorage.getItem(localStorageKeys.user) || '';
    const { email } = JSON.parse(storage) as { email: string };

    const todo = { id: uuidV4(), listName: listName || '', task, email };
    const { error } = await requestCreateTodo(todo);

    if (error) return sendNotification('error', error);

    sendNotification('success', 'Sua nova tarefa foi adicionada ao fim da lista');
    setTask('');
  };

  return (
    <StyledCreateTodo>
      <input
        type="text"
        value={task}
        placeholder={'...'}
        className="input-todo"
        onChange={(e) => setTask(e.target.value)}
        onKeyUp={(e) => e.key === 'Enter' && createTodo()}
      />

      <button onClick={() => createTodo()} className="submit-todo">
        Criar tarefa
      </button>
    </StyledCreateTodo>
  );
};
