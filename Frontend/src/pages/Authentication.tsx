import { Header } from '../features/authentication/Header';
import { Title } from '../features/authentication/Title';
import { Notification } from '../features/authentication/Notification';
import { useNotification } from '../features/authentication/hooks/useNotification';

const Authentication = () => {
  const { notification } = useNotification();

  return (
    <>
      <Header />
      <Title />
      {notification.isOpen && <Notification />}
    </>
  );
};

export default Authentication;
