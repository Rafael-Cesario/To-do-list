import produce from 'immer';
import { useState } from 'react';
import { useNotification } from '../../utils/hooks/useNotification';
import { StyledDetails } from './styles/StyledDetails';

export const Details = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [tagName, setTagName] = useState('');

  const { sendNotification } = useNotification();

  const addTag = () => {
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
        <button className="close">x</button>
      </div>

      <div className="details">
        <h1 className="task">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, quam?</h1>
        <span className="status">Status: done</span>

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
