import { IList } from "@/services/interfaces/list";
import { createSlice } from "@reduxjs/toolkit";

interface ListSlice {
	lists: IList[];
}

const defaultValues: ListSlice = {
	lists: [],
};

export const listSlice = createSlice({
	name: "List",
	initialState: defaultValues,
	reducers: {
		setLists: (state, action: { payload: { lists: IList[] } }) => {
			state.lists = action.payload.lists;
		},

		addList: (state, action: { payload: { list: IList } }) => {
			state.lists.push(action.payload.list);
		},
	},
});

export const { setLists, addList } = listSlice.actions;
