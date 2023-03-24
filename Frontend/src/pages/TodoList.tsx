import { useParams } from 'react-router-dom';

const TodoList = () => {
  const { listName } = useParams();

  return (
    <>
      <h1>{listName}</h1>
    </>
  );
};

export default TodoList;
