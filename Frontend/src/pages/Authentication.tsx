import { Header } from '../features/authentication/Header';
import { Title } from '../features/authentication/Title';
import { GlobalStyle } from '../styles/GlobalStyle';
import { Notification } from '../features/authentication/Notification';
import { useSelector } from 'react-redux';
import { Store } from '../features/authentication/utils/store';

const Authentication = () => {
  const notification = useSelector((state: Store) => state.notification);

  return (
    <>
      <GlobalStyle />
      <Header />
      <Title />
      {notification.isOpen && <Notification />}
    </>
  );
};

export default Authentication;
