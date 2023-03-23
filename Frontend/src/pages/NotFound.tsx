import { Link } from 'react-router-dom';
import { StyledNotFound } from '../styles/styledNotFound';

const NotFound = () => {
  return (
    <StyledNotFound>
      <h1>404</h1>
      <h2>Página não encontrada</h2>
      <Link to={'/'}>Ir para página inicial</Link>
    </StyledNotFound>
  );
};

export default NotFound;
