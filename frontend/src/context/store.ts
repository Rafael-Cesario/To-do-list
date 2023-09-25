import { configureStore } from "@reduxjs/toolkit";
import { notificationSlice } from "./notification-slice";
import { listSlice } from "@/features/home/context/list-slice";

export const store = configureStore({
	reducer: {
		notification: notificationSlice.reducer,
		list: listSlice.reducer,
	},
});

export type Store = ReturnType<typeof store.getState>;
