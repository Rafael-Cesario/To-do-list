import { IList } from "@/services/interfaces/list";
import { createSlice } from "@reduxjs/toolkit";

interface ListSlice {
	lists: IList[];
	active: IList;
}

const defaultValues: ListSlice = {
	active: { userID: "", listID: "", name: "" },
	lists: [],
};

export const listSlice = createSlice({
	name: "List",
	initialState: defaultValues,
	reducers: {
		setLists: (state, action: { payload: { lists: IList[] } }) => {
			state.lists = action.payload.lists;
		},

		setAddList: (state, action: { payload: { list: IList } }) => {
			state.lists.push(action.payload.list);
		},

		setActive: (state, action: { payload: { newActive: IList } }) => {
			state.active = action.payload.newActive;
		},

		setRenameList: (state, action: { payload: { list: IList } }) => {
			const listIndex = state.lists.findIndex((list) => list.listID === action.payload.list.listID);
			state.lists[listIndex] = action.payload.list;
			state.active = action.payload.list;
		},

		setDeleteList: (state, action: { payload: { listID: string } }) => {
			const listIndex = state.lists.findIndex((list) => list.listID === action.payload.listID);
			state.lists.splice(listIndex, 1);
			state.active = state.lists[0];
		},
	},
});

export const { setLists, setAddList, setActive, setRenameList, setDeleteList } = listSlice.actions;
