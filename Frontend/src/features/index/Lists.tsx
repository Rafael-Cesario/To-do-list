import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Store } from '../../utils/store';
import { StyledLists } from './styles/StyledLists';

export const Lists = () => {
  const { filter } = useSelector((state: Store) => state.filter);

  const lists: string[] = ['list01', 'list02', 'list03'];

  const filtredLists = lists.filter((list) => {
    if (!filter) return list;
    if (list.toLowerCase().includes(filter.toLowerCase())) return list;
  });

  return (
    <StyledLists>
      <h1 className="title">Listas</h1>

      {filtredLists.map((list, index) => (
        <Link key={list + index} className="list" to={`/:${list}`}>
          {list}
        </Link>
      ))}
    </StyledLists>
  );
};
