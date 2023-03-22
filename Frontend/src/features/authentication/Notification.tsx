import { StyledNotification } from './styles/StyledNotification';
import { useNotification } from './hooks/useNotification';

export const Notification = () => {
  const { notification, closeNotification } = useNotification();

  return (
    <StyledNotification>
      <div className="header">
        <span className={`type ${notification.type}`}>{notification.type}</span>
        <button className="close" onClick={() => closeNotification()}>
          x
        </button>
      </div>

      <p className="text">{notification.text}</p>
    </StyledNotification>
  );
};
