import { configureStore } from "@reduxjs/toolkit";
import { SliceNotification } from "./slice-notification";
import { listSlice } from "@/features/home/context/list-slice";

export const store = configureStore({
	reducer: {
		notification: SliceNotification.reducer,
		list: listSlice.reducer,
	},
});

export type Store = ReturnType<typeof store.getState>;
