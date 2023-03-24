import { useState } from 'react';
import { useNotification } from '../../utils/hooks/useNotification';
import { useQueriesTodos } from '../../utils/hooks/useQueriesTodos';
import { StyledCreateTodo } from './styles/StyledCreateTodo';
import { v4 as uuidV4 } from 'uuid';

export const CreateTodo = () => {
  const [task, setTask] = useState('');
  const { sendNotification } = useNotification();
  const { requestCreateTodo } = useQueriesTodos();

  const createTodo = async () => {
    if (!task) return sendNotification('error', 'Não posso criar uma tarefa vazia');

    const { error } = await requestCreateTodo({ id: uuidV4(), task });
    if (error) return sendNotification('error', error);

    sendNotification('success', 'Sua nova tarefa foi adicionada ao fim da lista');
    setTask('');
  };

  return (
    <StyledCreateTodo>
      <input
        type="text"
        value={task}
        placeholder="..............."
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
