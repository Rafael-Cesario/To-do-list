import { StyleCreateList } from './styles/StyledCreateList';

interface Props {
  props: {
    setShowCreateNewList: (newState: boolean) => void;
  };
}

export const CreateList = ({ props: { setShowCreateNewList } }: Props) => {
  return (
    <StyleCreateList>
      <h1 className="title">Criar nova lista</h1>
      <input className="list-name" type="text" placeholder="Nova lista" />

      <div className="buttons">
        <button>Criar</button>
        <button onClick={() => setShowCreateNewList(false)}>Cancelar</button>
      </div>
    </StyleCreateList>
  );
};
