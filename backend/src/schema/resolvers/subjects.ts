import { ICreateSubject, IUpdateSubject } from "../../interfaces/subjects";
import { subjectService } from "../../services/subjects";

export const subjectResolver = {
	Query: {
		getSubjects: (_: never, variables: { listID: string }) => subjectService.getSubjects(variables),
	},

	Mutation: {
		createSubject: (_: never, variables: ICreateSubject) => subjectService.createSubject(variables),
		updateSubject: (_: never, variables: IUpdateSubject) => subjectService.updateSubject(variables),
	},
};
