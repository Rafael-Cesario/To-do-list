import { createSlice } from "@reduxjs/toolkit";

interface INotification {
	isOpen: boolean;
	title: string;
	message: string;
	type: "success" | "error";
}

const defaultValues: INotification = {
	isOpen: false,
	title: "",
	message: "",
	type: "success",
};

export const SliceNotification = createSlice({
	name: "notification",
	initialState: defaultValues,
	reducers: {
		setNotification: (state, action: { payload: INotification }) => (state = action.payload),
	},
});
