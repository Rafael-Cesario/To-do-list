import { useDispatch, useSelector } from 'react-redux';
import { notificationSlice } from './utils/notificationSlice';
import { StyledNotification } from './styles/StyledNotification';
import { Store } from './utils/store';

export const Notification = () => {
  const notification = useSelector((state: Store) => state.notification);
  const dispatch = useDispatch();

  return (
    <StyledNotification>
      <div className="header">
        <span className={`type ${notification.type}`}>{notification.type}</span>
        <button className="close" onClick={() => dispatch(notificationSlice.actions.close())}>
          x
        </button>
      </div>

      <p className="text">{notification.text}</p>
    </StyledNotification>
  );
};
