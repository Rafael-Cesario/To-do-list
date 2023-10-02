import { configureStore } from "@reduxjs/toolkit";
import { notificationSlice } from "./notification-slice";
import { listSlice } from "@/features/home/context/list-slice";
import { searchTaskSlice } from "@/features/home/context/search-task-slice";

export const store = configureStore({
	reducer: {
		notification: notificationSlice.reducer,
		list: listSlice.reducer,
		searchTask: searchTaskSlice.reducer,
	},
});

export type Store = ReturnType<typeof store.getState>;
