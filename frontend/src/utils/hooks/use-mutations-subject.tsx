import { ICreateSubject, RCreateSubject } from "@/services/interfaces/subjects";
import { subjectQueries } from "@/services/queries/subjects";
import { useMutation } from "@apollo/client";

export const useMutationsSubject = () => {
	const [createSubjectMutation] = useMutation<RCreateSubject, ICreateSubject>(subjectQueries.CREATE_SUBJECT);

	const createSubjectRequest = async (variables: ICreateSubject) => await createSubjectMutation({ variables });

	return { createSubjectRequest };
};
