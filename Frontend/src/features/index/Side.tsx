import { useNavigate } from 'react-router-dom';
import { localStorageKeys } from '../../utils/localStorageKeys';
import { StyledSide } from './styles/StyledSide';

interface Props {
  props: {
    tab: string;
    setTab: (state: string) => void;
  };
}

export const Side = ({ props: { tab, setTab } }: Props) => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem(localStorageKeys.user);
    navigate('/');
  };

  return (
    <StyledSide>
      <div className="options">
        <button onClick={() => setTab('theme')} className={tab === 'theme' ? 'active' : ''}>
          Temas
        </button>

        <button onClick={() => setTab('user')} className={tab === 'user' ? 'active' : ''}>
          Usuário
        </button>
      </div>

      <button className="logout" onClick={() => logout()}>
        Sair
      </button>
    </StyledSide>
  );
};
