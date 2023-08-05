import { subjectService } from "../../services/subjects";

export const subjectResolver = {
	Query: {
		getSubjects: (_: never, variables: { listID: string }) => subjectService.getSubjects(variables),
	},
};
