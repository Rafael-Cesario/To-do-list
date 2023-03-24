import { useState } from 'react';
import { useNotification } from '../../utils/hooks/useNotification';
import { StyleCreateList } from './styles/StyledCreateList';

interface Props {
  props: {
    setShowCreateNewList: (newState: boolean) => void;
  };
}

export const CreateList = ({ props: { setShowCreateNewList } }: Props) => {
  const { sendNotification } = useNotification();
  const [listName, setListName] = useState('');

  const createList = () => {
    if (!listName) return sendNotification('error', 'Sua lista precisa de um nome');
  };

  return (
    <StyleCreateList>
      <h1 className="title">Criar nova lista</h1>

      <input
        type="text"
        placeholder="Nova lista"
        className="list-name"
        value={listName}
        onChange={(e) => setListName(e.target.value)}
        onKeyUp={(e) => e.key === 'Enter' && createList()}
      />

      <div className="buttons">
        <button onClick={() => createList()}>Criar</button>
        <button onClick={() => setShowCreateNewList(false)}>Cancelar</button>
      </div>
    </StyleCreateList>
  );
};
