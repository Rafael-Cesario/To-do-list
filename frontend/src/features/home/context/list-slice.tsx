import { IList } from "@/services/interfaces/list";
import { createSlice } from "@reduxjs/toolkit";

interface ListSlice {
	lists: IList[];
}

const defaultValues: ListSlice = {
	lists: [],
};

export const listSlice = createSlice({
	name: "list",
	initialState: defaultValues,

	reducers: {
		setLists(state, action: { payload: { lists: IList[] } }) {
			state.lists = action.payload.lists;
		},

		setAddList(state, action: { payload: { newList: IList } }) {
			state.lists.push(action.payload.newList);
		},
	},
});

export const { setLists, setAddList } = listSlice.actions;
