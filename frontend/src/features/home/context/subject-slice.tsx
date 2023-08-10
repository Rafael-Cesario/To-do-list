import { ISubject } from "@/services/interfaces/subjects";
import { createSlice } from "@reduxjs/toolkit";

interface SubjectSlice {
	subjects: ISubject[];
}

const defaultValues: SubjectSlice = {
	subjects: [],
};

export const subjectSlice = createSlice({
	name: "subject",
	initialState: defaultValues,

	reducers: {
		setSubjects: (state, action: { payload: { subjects: ISubject[] } }) => {
			state.subjects = action.payload.subjects;
		},
	},
});

export const { setSubjects } = subjectSlice.actions;
