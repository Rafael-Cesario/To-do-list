import { createSlice } from "@reduxjs/toolkit";

type OptionsKeys = "" | "rename" | "delete";

interface OptionsSlice {
	isOpen: OptionsKeys;
}

const defaultValues: OptionsSlice = {
	isOpen: "",
};

export const optionsSlice = createSlice({
	name: "options",
	initialState: defaultValues,

	reducers: {
		setOpenOptions: (state, action: { payload: { isOpen: OptionsKeys } }) => {
			state.isOpen = action.payload.isOpen;
		},
	},
});

export const { setOpenOptions } = optionsSlice.actions;
