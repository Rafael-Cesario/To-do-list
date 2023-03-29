import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useNotification } from '../../utils/hooks/useNotification';
import { useQueriesList } from '../../utils/hooks/useQueriesList';
import { UserStorage } from '../../utils/localStorageKeys';
import { StyledConfigs } from './styles/StyledConfigs';

export const Configs = () => {
  const storage = new UserStorage();
  const { listName: paramsListName } = useParams();
  const [listName, setListName] = useState(paramsListName ?? '');
  const [isOpen, setIsOpen] = useState(false);
  const [showConfirmButton, setShowConfirmButton] = useState(false);

  const navigate = useNavigate();

  const { sendNotification } = useNotification();
  const { requestRenameList, requestDeleteList } = useQueriesList();

  const saveConfigs = async () => {
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

  const deleteList = async () => {
    const { email } = storage.readData();
    const { error } = await requestDeleteList({ email, listName });

    if (error) return sendNotification('error', error);

    navigate('/index');
  };

  return (
    <StyledConfigs>
      <button className="open-close" onClick={() => setIsOpen(!isOpen)}>
        Configs
      </button>

      {isOpen && (
        <div className="configs">
          <div className="tab">
            <h1 className="title">Configs</h1>
            <button className="close" onClick={() => setIsOpen(false)}>
              x
            </button>
          </div>

          <div className="config">
            <span>Nome da lista</span>
            <input type="text" value={listName} onChange={(e) => setListName(e.target.value)} />
          </div>

          <div className="actions">
            <button onClick={() => saveConfigs()}>Salvar</button>

            {showConfirmButton || <button onClick={() => setShowConfirmButton(true)}>Excluir Lista</button>}

            {showConfirmButton && (
              <button className="confirm-delete" autoFocus={true} onBlur={() => setShowConfirmButton(false)} onClick={() => deleteList()}>
                <p>Clique novamente para deletar sua lista.</p>
                <p>Cancele clicando fora do botão</p>
                <p>Deletar sua lista irá excluir todas as suas tarefas</p>
              </button>
            )}
          </div>
        </div>
      )}
    </StyledConfigs>
  );
};
