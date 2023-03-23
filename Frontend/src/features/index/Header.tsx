import { useDispatch, useSelector } from 'react-redux';
import { Store } from '../../utils/store';
import { StyledHeader } from './styles/StyledHeader';
import { filterSlice } from './utils/filterSlice';

export const Header = () => {
  const { filter } = useSelector((state: Store) => state.filter);
  const dispatch = useDispatch();

  const setFilter = (filter: string) => {
    dispatch(filterSlice.actions.changeFilter({ filter }));
  };

  return (
    <StyledHeader>
      <div className="menu">
        <button className="perfil">Perfil</button>
        <button>Criar nova lista</button>
      </div>

      <input onChange={(e) => setFilter(e.target.value)} className="search" type="text" placeholder="Busque por uma lista..." value={filter} />
    </StyledHeader>
  );
};
