import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNotification } from '../../utils/hooks/useNotification';
import { useQueriesList } from '../../utils/hooks/useQueriesList';
import { StyleCreateList } from './styles/StyledCreateList';
import { sliceLists } from './utils/sliceLists';

interface Props {
  props: {
    setShowCreateNewList: (newState: boolean) => void;
  };
}

export const CreateList = ({ props: { setShowCreateNewList } }: Props) => {
  const dispatch = useDispatch();
  const [listName, setListName] = useState('');
  const { sendNotification } = useNotification();
  const { requestCreateList } = useQueriesList();

  const createList = async () => {
    if (!listName) return sendNotification('error', 'Sua lista precisa de um nome');

    // todo > create a object to hold all the keys for your localStorage.
    // todo > create a hook useStorage.
    const storage = JSON.parse(localStorage.getItem('user') || '') as { email: string; token: string };
    const email = storage.email;
    const { error } = await requestCreateList({ email, listName });
    if (error) return sendNotification('error', error);

    dispatch(sliceLists.actions.createList({ listName }));
    sendNotification('success', 'Uma nova lista foi criada');
    setListName('');
  };

  return (
    <StyleCreateList>
      <div className="tab">
        <h1 className="title">Criar nova lista</h1>
        <button onClick={() => setShowCreateNewList(false)}>x</button>
      </div>

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
