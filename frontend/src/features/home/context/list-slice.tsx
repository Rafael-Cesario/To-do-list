import { IList } from "@/services/interfaces/list";
import { createSlice } from "@reduxjs/toolkit";

interface ListSlice {
	lists: IList[];
	filter: string;
	active: IList | null;
	isMenuOpen: boolean;
}

const defaultValues: ListSlice = {
	lists: [],
	filter: "",
	active: null,
	isMenuOpen: false,
};

export const listSlice = createSlice({
	name: "list",
	initialState: defaultValues,

	reducers: {
		setLists(state, action: { payload: { lists: IList[] } }) {
			state.lists = action.payload.lists;
		},

		setListFilter(state, action: { payload: { filter: string } }) {
			state.filter = action.payload.filter;
		},

		setAddList(state, action: { payload: { newList: IList } }) {
			state.lists.push(action.payload.newList);
		},

		setActiveList(state, action: { payload: { newActive: IList } }) {
			state.active = action.payload.newActive;
		},

		setListMenu(state, action: { payload: { isOpen: boolean } }) {
			state.isMenuOpen = action.payload.isOpen;
		},

		setUpdateList(state, action: { payload: { newList: IList } }) {
			const { newList } = action.payload;
			const listIndex = state.lists.findIndex((list) => list.id === newList.id);
			state.lists[listIndex] = newList;
		},
	},
});

export const { setLists, setAddList, setListFilter, setActiveList, setListMenu , setUpdateList} = listSlice.actions;
