import { Header } from '../features/authentication/Header';
import { Title } from '../features/authentication/Title';
import { GlobalStyle } from '../styles/GlobalStyle';
import { Notification } from '../features/authentication/Notification';
import { useNotification } from '../features/authentication/hooks/useNotification';

const Authentication = () => {
  const { notification } = useNotification();

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
