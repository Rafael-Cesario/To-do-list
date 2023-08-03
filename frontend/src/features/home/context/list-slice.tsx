import { IList } from "@/services/interfaces/list";
import { createSlice } from "@reduxjs/toolkit";

interface ListSlice {
	lists: IList[];
	active: string;
}

const defaultValues: ListSlice = {
	lists: [],
	active: "",
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

		setActive: (state, action: { payload: { newActive: string } }) => {
			state.active = action.payload.newActive;
		},
	},
});

export const { setLists, addList, setActive } = listSlice.actions;
