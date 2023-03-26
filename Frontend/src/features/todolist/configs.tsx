import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useNotification } from '../../utils/hooks/useNotification';
import { useQueriesList } from '../../utils/hooks/useQueriesList';
import { UserStorage } from '../../utils/localStorageKeys';
import { StyledConfigs } from './styles/StyledConfigs';

export const Configs = () => {
  const { listName: paramsListName } = useParams();
  const [listName, setListName] = useState(paramsListName ?? '');
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const { sendNotification } = useNotification();
  const { requestRenameList } = useQueriesList();

  const saveConfigs = async () => {
    const storage = new UserStorage();
    const { email } = storage.readData();

    const { error } = await requestRenameList({
      email,
      newName: listName,
      oldName: paramsListName || '',
    });

    if (error) return sendNotification('error', error);

    setIsOpen(false);
    navigate(`/list/${listName}`);
  };

  return (
    <StyledConfigs>
      <button className="open-close" onClick={() => setIsOpen(!isOpen)}>
        Configs
      </button>

      {isOpen && (
        <div className="configs">
          <div className="tab">
            <button className="close" onClick={() => setIsOpen(false)}>
              x
            </button>
          </div>

          <h1 className="title">Configs</h1>

          <span>Nome da lista</span>
          <input type="text" value={listName} onChange={(e) => setListName(e.target.value)} />

          <div className="actions">
            <button onClick={() => saveConfigs()}>Salvar</button>
            <button>Excluir Lista</button>
          </div>
        </div>
      )}
    </StyledConfigs>
  );
};
