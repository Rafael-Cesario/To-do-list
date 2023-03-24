import { useState } from 'react';
import { useNotification } from '../../utils/hooks/useNotification';
import { QueriesLists } from '../../utils/queries/queriesLists';
import { StyleCreateList } from './styles/StyledCreateList';

interface Props {
  props: {
    setShowCreateNewList: (newState: boolean) => void;
  };
}

export const CreateList = ({ props: { setShowCreateNewList } }: Props) => {
  const { sendNotification } = useNotification();
  const [listName, setListName] = useState('');

  const createList = async () => {
    if (!listName) return sendNotification('error', 'Sua lista precisa de um nome');

    // todo > create a object to hold all the keys for your localStorage.
    // todo > create a hook useStorage.
    const storage = JSON.parse(localStorage.getItem('user') || '') as { email: string; token: string };
    const queriesList = new QueriesLists();
    const email = storage.email;
    const { error } = await queriesList.createList({ email, listName });
    if (error) return sendNotification('error', error);

    sendNotification('success', 'Uma nova lista foi criada');
    setListName('');
  };

  return (
    <StyleCreateList>
      <h1 className="title">Criar nova lista</h1>

      <input
        type="text"
        placeholder="Nova lista"
        className="list-name"
        autoFocus={true}
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
