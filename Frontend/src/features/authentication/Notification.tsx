import { StyledNotification } from './styles/StyledNotification';
import { useNotification } from './hooks/useNotification';

export const Notification = () => {
  const { notification, closeNotification } = useNotification();

  const types = {
    error: '\u274c Ops, algo deu errado',
    success: `\u2713 Sucesso`,
  };

  const type = types[notification.type as keyof typeof types];

  return (
    <StyledNotification>
      <div className="header">
        <span className={`type ${notification.type}`}>{type}</span>
        <button className="close" onClick={() => closeNotification()}>
          x
        </button>
      </div>

      <p className="text">{notification.text}</p>
    </StyledNotification>
  );
};

// todo > Tests
