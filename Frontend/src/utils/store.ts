import { configureStore } from '@reduxjs/toolkit';
import { notificationSlice } from './slices/sliceNotification';
import { sliceFilter } from '../features/index/utils/sliceFilter';
import { sliceLists } from '../features/index/utils/sliceLists';
import { sliceTodos } from '../features/todolist/utils/sliceTodos';
import { sliceTheme } from './slices/sliceTheme';

export const store = configureStore({
  reducer: {
    notification: notificationSlice.reducer,
    filter: sliceFilter.reducer,
    lists: sliceLists.reducer,
    todos: sliceTodos.reducer,
    theme: sliceTheme.reducer,
  },
});

export type Store = ReturnType<typeof store.getState>;
