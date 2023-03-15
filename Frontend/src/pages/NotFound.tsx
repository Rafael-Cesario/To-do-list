import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <>
      <h1>404</h1>
      <p>Página não encontrada</p>
      <Link to={'/'}>Voltar para a home page</Link>
    </>
  );
};

export default NotFound;
