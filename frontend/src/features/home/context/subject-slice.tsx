import { ISubject } from "@/services/interfaces/subjects";
import { createSlice } from "@reduxjs/toolkit";

interface SubjectSlice {
	subjects: ISubject[];
	searchSubjectValue: string;
}

const defaultValues: SubjectSlice = {
	subjects: [],
	searchSubjectValue: "",
};

export const subjectSlice = createSlice({
	name: "subject",
	initialState: defaultValues,

	reducers: {
		setSubjects: (state, action: { payload: { subjects: ISubject[] } }) => {
			state.subjects = action.payload.subjects;
		},

		setNewSubject: (state, action: { payload: { newSubject: ISubject } }) => {
			state.subjects.push(action.payload.newSubject);
		},

		setUpdateSubject: (state, action: { payload: { subject: ISubject } }) => {
			const index = state.subjects.findIndex((subject) => subject.subjectID === action.payload.subject.subjectID);
			state.subjects[index] = { ...state.subjects[index], ...action.payload.subject };
		},

		setSubjectFilter: (state, action: { payload: { searchValue: string } }) => {
			state.searchSubjectValue = action.payload.searchValue;
		},
	},
});

export const { setSubjects, setNewSubject, setUpdateSubject, setSubjectFilter } = subjectSlice.actions;
