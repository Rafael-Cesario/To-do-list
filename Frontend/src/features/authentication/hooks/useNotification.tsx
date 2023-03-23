import { useSelector, useDispatch } from 'react-redux';
import { notificationSlice } from '../utils/notificationSlice';
import { Store } from '../../../utils/store';

type NotificationType = 'error' | 'success';

export const useNotification = () => {
  const notification = useSelector((state: Store) => state.notification);
  const dispatch = useDispatch();

  const sendNotification = (type: NotificationType, text: string) => {
    dispatch(
      notificationSlice.actions.sendNotification({
        isOpen: true,
        text,
        type,
      })
    );
  };

  const closeNotification = () => {
    dispatch(notificationSlice.actions.close());
  };

  return { notification, sendNotification, closeNotification };
};

// todo > tests
