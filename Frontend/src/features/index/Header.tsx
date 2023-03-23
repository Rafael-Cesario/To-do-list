import { StyledHeader } from './styles/StyledHeader';

export const Header = () => {
  return (
    <StyledHeader>
      <div className="menu">
        <button className='perfil'>Perfil</button>
        <button>Criar nova lista</button>
      </div>

      <input className="search" type="text" placeholder="Busque por uma lista..." />
    </StyledHeader>
  );
};
