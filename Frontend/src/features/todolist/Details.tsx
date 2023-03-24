import produce from 'immer';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNotification } from '../../utils/hooks/useNotification';
import { Store } from '../../utils/store';
import { StyledDetails } from './styles/StyledDetails';

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

export const Details = ({ props: { showDetails, setShowDetails } }: Props) => {
  const [tags, setTags] = useState<string[]>([]);
  const [tagName, setTagName] = useState('');

  const { sendNotification } = useNotification();

  const statusMap = {
    next: 'Próximas',
    current: 'Em progresso',
    done: 'Finalizada',
  };

  const { todos } = useSelector((state: Store) => state.todos);
  const currentTodo = todos[showDetails.todoIndex];
  const status = statusMap[currentTodo.status as keyof typeof statusMap];

  const addTag = () => {
    if (!tagName) return;

    const hasTag = tags.filter((tag) => tag.toLowerCase() === tagName.toLowerCase()).length;
    if (hasTag) return sendNotification('error', 'Uma tag com o mesmo nome já existe.');

    const newTags = produce(tags, (draft) => {
      draft.push(tagName);
    });

    setTags(newTags);
    setTagName('');
  };

  const removeTag = (tag: string) => {
    const newTags = produce(tags, (draft) => {
      const tagIndex = draft.indexOf(tag);
      draft.splice(tagIndex, 1);
    });

    setTags(newTags);
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

        <div className="tags">
          <h2>Tags</h2>

          <div className="container">
            {tags.map((tag, index) => (
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
        </div>

        <div className="notes">
          <h2>Anotações</h2>
          <textarea placeholder="........." />
        </div>
      </div>
    </StyledDetails>
  );
};
