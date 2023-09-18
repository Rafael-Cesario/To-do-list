import { createSlice } from "@reduxjs/toolkit";

interface NotificationSlice {
	isOpen: boolean;
	type: "error" | "success";
	title: string;
	message: string;
}

const defaultValues: NotificationSlice = {
	isOpen: false,
	type: "success",
	title: "",
	message: "",
};

export const notificationSlice = createSlice({
	name: "notification",
	initialState: defaultValues,

	reducers: {
		setNotification(state, action: { payload: { newState: NotificationSlice } }) {
			const { isOpen, type, title, message } = action.payload.newState;

			state.isOpen = isOpen;
			state.type = type;
			state.title = title;
			state.message = message;
		},
	},
});

export const { setNotification } = notificationSlice.actions;
