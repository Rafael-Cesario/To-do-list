import { StyledCreateNewList } from './styles/StyledCreateNewList';

export const CreateNewList = () => {
  return (
    <StyledCreateNewList>
      <h1 className="title">Criar nova lista</h1>
      <input className="list-name" type="text" placeholder="Nova lista" />

      <div className="buttons">
        <button>Criar</button>
        <button>Cancelar</button>
      </div>
    </StyledCreateNewList>
  );
};
