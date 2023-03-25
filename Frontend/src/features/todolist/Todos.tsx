import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { client } from '../../client';
import { useNotification } from '../../utils/hooks/useNotification';
import { InputReadTodos, READ_TODOS } from '../../utils/interfaces/interfaceQueriesTodos';
import { localStorageKeys } from '../../utils/localStorageKeys';
import { errors } from '../../utils/requestErrors';
import { Store } from '../../utils/store';
import { CreateTodo } from './CreateTodo';
import { StyledTodos } from './styles/StyledTodos';
import { sliceTodos } from './utils/sliceTodos';

interface Props {
  props: {
    showDetails: { isOpen: boolean; todoIndex: number };
    setShowDetails: React.Dispatch<
      React.SetStateAction<{
        isOpen: boolean;
        todoIndex: number;
      }>
    >;
  };
}

export const Todos = ({ props: { showDetails, setShowDetails } }: Props) => {
  const { todos } = useSelector((state: Store) => state.todos);
  const { listName } = useParams();
  const { sendNotification } = useNotification();
  const dispatch = useDispatch();

  const loadTodos = async () => {
    try {
      const storage = JSON.parse(localStorage.getItem(localStorageKeys.user) || '');
      const readTodos: InputReadTodos = { email: storage.email, listName: listName || '' };

      const { data } = await client.query({
        query: READ_TODOS,
        variables: { readTodos },
      });

      const todos = data?.readTodos || [];
      dispatch(sliceTodos.actions.loadTodos({ todos }));
    } catch (error: any) {
      console.log({ error: error.message });
      const errorMessage = errors[error.message as keyof typeof errors];
      sendNotification('error', errorMessage || errors.default);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <StyledTodos>
      <CreateTodo />

      <div className="todos">
        {todos.length < 1 && <p>Suas tarefas apareceram aqui.</p>}

        {todos.map((todo, index) => (
          <div
            key={todo.task + index}
            className={`todo ${todo.status}`}
            data-id={todo.id}
            onClick={() => setShowDetails({ isOpen: !showDetails.isOpen, todoIndex: index })}>
            <div className={`status`} data-status={todo.status} />
            <button className={`task`}>{todo.task}</button>
          </div>
        ))}
      </div>
    </StyledTodos>
  );
};
