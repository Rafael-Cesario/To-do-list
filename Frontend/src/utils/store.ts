import { configureStore } from '@reduxjs/toolkit';
import { notificationSlice } from '../features/authentication/utils/notificationSlice';
import { filterSlice } from '../features/index/utils/filterSlice';

export const store = configureStore({
  reducer: {
    notification: notificationSlice.reducer,
    filter: filterSlice.reducer,
  },
});

export type Store = ReturnType<typeof store.getState>;
