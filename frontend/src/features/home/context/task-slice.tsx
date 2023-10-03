import { ITask } from "@/services/interfaces/task";
import { createSlice } from "@reduxjs/toolkit";

interface ITaskSlice {
	filter: string;
	activeTask: ITask | null;
}

const defaultValues: ITaskSlice = {
	activeTask: null,
	filter: "",
};

export const taskSlice = createSlice({
	name: "task",
	initialState: defaultValues,
	reducers: {
		setActive(state, action: { payload: ITask | null }) {
			state.activeTask = action.payload;
		},

		setFilter(state, action: { payload: string }) {
			state.filter = action.payload;
		},
	},
});

export const { setFilter, setActive } = taskSlice.actions;
