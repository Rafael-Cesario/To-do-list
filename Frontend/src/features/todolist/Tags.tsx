import produce from 'immer';
import { useNotification } from '../../utils/hooks/useNotification';
import { useState } from 'react';
import { StyledTags } from './styles/StyledTags';

export const Tags = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [tagName, setTagName] = useState('');
  const { sendNotification } = useNotification();

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
    <StyledTags>
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
    </StyledTags>
  );
};
