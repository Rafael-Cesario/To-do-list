import { configureStore } from "@reduxjs/toolkit";
import { SliceNotification } from "./slice-notification";

export const store = configureStore({
	reducer: {
		notification: SliceNotification.reducer,
	},
});

export type Store = ReturnType<typeof store.getState>

