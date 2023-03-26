import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { StyledConfigs } from './styles/StyledConfigs';

export const Configs = () => {
  const { listName: paramsListName } = useParams();
  const [listName, setListName] = useState(paramsListName ?? '');
  const [isOpen, setIsOpen] = useState(false);

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
            <button>Salvar</button>
            <button>Excluir Lista</button>
          </div>
        </div>
      )}
    </StyledConfigs>
  );
};
