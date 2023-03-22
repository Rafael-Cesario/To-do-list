import { createSlice } from '@reduxjs/toolkit';

interface INotification {
  type: 'error' | 'success';
  text: string;
  isOpen: boolean;
}

const initialState: INotification = {
  type: 'error',
  text: '',
  isOpen: false,
};

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,

  reducers: {
    sendNotification: (state, action: { payload: typeof state }) => {
      state.isOpen = action.payload.isOpen;
      state.type = action.payload.type;
      state.text = action.payload.text;
    },

    close: (state) => {
      state.isOpen = false;
    },
  },
});
