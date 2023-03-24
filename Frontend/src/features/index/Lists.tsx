import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNotification } from '../../utils/hooks/useNotification';
import { useQueriesList } from '../../utils/hooks/useQueriesList';
import { Store } from '../../utils/store';
import { Loading } from '../authentication/Loading';
import { StyledLists } from './styles/StyledLists';

export const Lists = () => {
  const { filter } = useSelector((state: Store) => state.filter);
  const { lists } = useSelector((state: Store) => state.lists);
  const { loading, error } = useQueriesList();

  const filtredLists = lists.filter((list) => {
    if (!filter) return list;
    if (list.toLowerCase().includes(filter.toLowerCase())) return list;
  });

  const { sendNotification } = useNotification();

  if (error)
    sendNotification(
      'error',
      'Um erro ocorreu carregando suas listas, tente recarregar a página, se o error continuar por favor saia e entre novamente em sua conta'
    );

  return (
    <StyledLists>
      <h1 className="title">Listas</h1>
      <Loading isLoading={loading} />

      {filtredLists.map((list, index) => (
        <Link key={list + index} className="list" to={`/${list}`}>
          {list}
        </Link>
      ))}
    </StyledLists>
  );
};
