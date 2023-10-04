import { ICreateSubject, IDeleteSubject, IUpdateSubject, RCreateSubject, RDeleteSubject, RUpdateSubject } from "@/services/interfaces/subjects";
import { subjectQueries } from "@/services/queries/subjects";
import { useMutation } from "@apollo/client";

export const useMutationsSubject = () => {
	const [createSubjectMutation] = useMutation<RCreateSubject, ICreateSubject>(subjectQueries.CREATE_SUBJECT);
	const [updateSubjectMutation] = useMutation<RUpdateSubject, IUpdateSubject>(subjectQueries.UPDATE_SUBJECT);
	const [deleteSubjectMutation] = useMutation<RDeleteSubject, IDeleteSubject>(subjectQueries.DELETE_SUBJECT);

	const createSubjectRequest = async (variables: ICreateSubject) => await createSubjectMutation({ variables });
	const updateSubjectRequest = async (variables: IUpdateSubject) => await updateSubjectMutation({ variables });
	const deleteSubjectRequest = async (variables: IDeleteSubject) => await deleteSubjectMutation({ variables });

	return { createSubjectRequest, updateSubjectRequest, deleteSubjectRequest };
};
