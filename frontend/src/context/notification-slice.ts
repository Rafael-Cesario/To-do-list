import { createSlice } from "@reduxjs/toolkit";

interface NotificationSlice {
	isOpen: boolean;
	type: "error" | "success";
	title: string;
	message: string;
}

const defaultValues: NotificationSlice = {
	isOpen: true,
	type: "error",
	title: "Error",
	message: "Algum erro ocorreu",
};

export const notificationSlice = createSlice({
	name: "notification",
	initialState: defaultValues,
	reducers: {},
});
