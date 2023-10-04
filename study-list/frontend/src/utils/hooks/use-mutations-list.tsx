import { ICreateList, IDeleteList, IRenameList, RCreateList, RDeleteList, RRenameList } from "@/services/interfaces/list";
import { listQueries } from "@/services/queries/list";
import { useMutation } from "@apollo/client";

export const useMutationsList = () => {
	const [createListMutation] = useMutation<RCreateList, ICreateList>(listQueries.CREATE_LIST);
	const [renameListMutation] = useMutation<RRenameList, IRenameList>(listQueries.RENAME_LIST);
	const [deleteListMutation] = useMutation<RDeleteList, IDeleteList>(listQueries.DELETE_LIST);

	const createListRequest = async (variables: ICreateList) => await createListMutation({ variables });
	const renameListRequest = async (variables: IRenameList) => await renameListMutation({ variables });
	const deleteListRequest = async (variables: IDeleteList) => await deleteListMutation({ variables });

	return { createListRequest, renameListRequest, deleteListRequest };
};
