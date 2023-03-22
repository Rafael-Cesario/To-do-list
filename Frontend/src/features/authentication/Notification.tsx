import { useDispatch } from 'react-redux';
import { notificationSlice } from './utils/notificationSlice';

export const Notification = () => {
  const dispatch = useDispatch();

  return (
    <>
      <div className="header">
        <button className="close" onClick={() => dispatch(notificationSlice.actions.close())}>
          x
        </button>
        <span className="type">Erro</span>
      </div>

      <p className="text">Um erro ocorreu</p>
    </>
  );
};
