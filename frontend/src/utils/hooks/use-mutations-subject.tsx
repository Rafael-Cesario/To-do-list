import { ICreateSubject, IUpdateSubject, RCreateSubject, RUpdateSubject } from "@/services/interfaces/subjects";
import { subjectQueries } from "@/services/queries/subjects";
import { useMutation } from "@apollo/client";

export const useMutationsSubject = () => {
	const [createSubjectMutation] = useMutation<RCreateSubject, ICreateSubject>(subjectQueries.CREATE_SUBJECT);
	const [updateSubjectMutation] = useMutation<RUpdateSubject, IUpdateSubject>(subjectQueries.UPDATE_SUBJECT);

	const createSubjectRequest = async (variables: ICreateSubject) => await createSubjectMutation({ variables });
	const updateSubjectRequest = async (variables: IUpdateSubject) => await updateSubjectMutation({ variables });

	return { createSubjectRequest, updateSubjectRequest };
};
