import { ITag } from "@/services/interfaces/tags";
import { createSlice } from "@reduxjs/toolkit";

interface TagSlice {
	userID: string;
	tags: ITag[];
}

const defaultValues: TagSlice = {
	userID: "",
	tags: [],
};

export const tagSlice = createSlice({
	name: "tag",
	initialState: defaultValues,

	reducers: {
		setTags: (state, action: { payload: { userID: string; newTags: ITag[] } }) => {
			state.userID = action.payload.userID;
			state.tags = action.payload.newTags;
		},
	},
});

export const { setTags } = tagSlice.actions;
