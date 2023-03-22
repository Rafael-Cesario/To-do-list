import { createSlice } from '@reduxjs/toolkit';

export const notificationSlice = createSlice({
  name: 'notification',
  initialState: { type: '', text: '', isOpen: false },
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
