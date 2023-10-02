import { createSlice } from "@reduxjs/toolkit";

interface SearchTaskSlice {
	filter: string;
}

const defaultValues: SearchTaskSlice = {
	filter: "",
};

export const searchTaskSlice = createSlice({
	name: "searchTask",
	initialState: defaultValues,
	reducers: {
		setFilter(state, action: { payload: string }) {
			state.filter = action.payload;
		},
	},
});

export const { setFilter } = searchTaskSlice.actions;
