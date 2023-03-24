import { useDispatch, useSelector } from 'react-redux';
import { Store } from '../../utils/store';
import { StyledHeader } from './styles/StyledHeader';
import { sliceFilter } from './utils/sliceFilter';

interface Props {
  props: {
    showCreateNewList: boolean;
    setShowCreateNewList: (newState: boolean) => void;
  };
}

export const Header = ({ props: { showCreateNewList, setShowCreateNewList } }: Props) => {
  const { filter } = useSelector((state: Store) => state.filter);
  const dispatch = useDispatch();

  const setFilter = (filter: string) => {
    dispatch(sliceFilter.actions.changeFilter({ filter }));
  };

  return (
    <StyledHeader>
      <div className="menu">
        <button className="perfil">Perfil</button>
        <button onClick={() => setShowCreateNewList(!showCreateNewList)}>Criar nova lista</button>
      </div>

      <input onChange={(e) => setFilter(e.target.value)} className="search" type="text" placeholder="Busque por uma lista..." value={filter} />
    </StyledHeader>
  );
};
