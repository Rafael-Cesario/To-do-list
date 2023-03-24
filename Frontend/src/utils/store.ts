import { configureStore } from '@reduxjs/toolkit';
import { notificationSlice } from './notificationSlice';
import { sliceFilter } from '../features/index/utils/sliceFilter';
import { sliceLists } from '../features/index/utils/sliceLists';

export const store = configureStore({
  reducer: {
    notification: notificationSlice.reducer,
    filter: sliceFilter.reducer,
    lists: sliceLists.reducer,
  },
});

export type Store = ReturnType<typeof store.getState>;
