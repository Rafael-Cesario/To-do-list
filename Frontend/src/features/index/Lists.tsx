import { Link } from 'react-router-dom';
import { StyledLists } from './styles/StyledLists';

export const Lists = () => {
  return (
    <StyledLists>
      <h1 className="title">Listas</h1>

      <Link className="list" to={'/:listName'}>
        THis is a name for a list
      </Link>
      <Link className="list" to={'/:listName'}>
        this is another list
      </Link>
      <Link className="list" to={'/:listName'}>
        this is a list
      </Link>
      <Link className="list" to={'/:listName'}>
        hello list
      </Link>
      <Link className="list" to={'/:listName'}>
        ListName
      </Link>
      <Link className="list" to={'/:listName'}>
        ListName
      </Link>
      <Link className="list" to={'/:listName'}>
        ListName
      </Link>
      <Link className="list" to={'/:listName'}>
        ListName
      </Link>
      <Link className="list" to={'/:listName'}>
        ListName
      </Link>
      <Link className="list" to={'/:listName'}>
        ListName
      </Link>
    </StyledLists>
  );
};
