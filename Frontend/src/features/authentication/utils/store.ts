import { configureStore } from '@reduxjs/toolkit';
import { notificationSlice } from './notificationSlice';

export const store = configureStore({
  reducer: {
    notification: notificationSlice.reducer,
  },
});

export type Store = ReturnType<typeof store.getState>;
