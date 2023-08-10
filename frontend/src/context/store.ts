import { configureStore } from "@reduxjs/toolkit";
import { SliceNotification } from "./slice-notification";
import { listSlice } from "@/features/home/context/list-slice";
import { optionsSlice } from "@/features/home/context/options-slice";
import { subjectSlice } from "@/features/home/context/subject-slice";

export const store = configureStore({
	reducer: {
		notification: SliceNotification.reducer,
		list: listSlice.reducer,
		options: optionsSlice.reducer,
		subject: subjectSlice.reducer,
	},
});

export type Store = ReturnType<typeof store.getState>;
