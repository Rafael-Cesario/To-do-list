import produce from 'immer';
import { useNotification } from '../../utils/hooks/useNotification';
import { useState } from 'react';
import { StyledTags } from './styles/StyledTags';
import { ITodoModel } from '../../utils/interfaces/interfaceQueriesTodos';

interface Props {
  props: {
    todo: ITodoModel;
    setTodo: React.Dispatch<React.SetStateAction<ITodoModel>>;
  };
}

export const Tags = ({ props: { todo, setTodo } }: Props) => {
  const [tagName, setTagName] = useState('');
  const { sendNotification } = useNotification();

  const addTag = () => {
    if (!tagName) return;

    const hasTag = todo.tags.filter((tag) => tag.toLowerCase() === tagName.toLowerCase()).length;
    if (hasTag) return sendNotification('error', 'Uma tag com o mesmo nome já existe.');

    const newStateTodo = produce(todo, (draft) => {
      draft.tags.push(tagName);
    });

    setTodo(newStateTodo);
    setTagName('');
  };

  const removeTag = (tag: string) => {
    const newStateTodo = produce(todo, (draft) => {
      const tagIndex = draft.tags.indexOf(tag);
      draft.tags.splice(tagIndex, 1);
    });

    setTodo(newStateTodo);
  };

  return (
    <StyledTags>
      <h2>Tags</h2>

      <div className="container">
        {todo.tags.map((tag, index) => (
          <div className="tag" key={tag + index}>
            <span>{tag}</span>
            <button onClick={() => removeTag(tag)} className="remove-tag">
              x
            </button>
          </div>
        ))}

        <input
          value={tagName}
          onChange={(e) => setTagName(e.target.value)}
          onKeyUp={(e) => e.key === 'Enter' && addTag()}
          className="new-tag"
          type="text"
          placeholder="Adicione com Enter"
        />
      </div>
    </StyledTags>
  );
};
