import { useNavigate } from 'react-router-dom';
import { StyledNotFound } from '../styles/styledNotFound';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <StyledNotFound>
      <h1>404</h1>
      <h2>Página não encontrada</h2>
      <button onClick={() => navigate(-1)}>Voltar</button>
    </StyledNotFound>
  );
};

export default NotFound;
