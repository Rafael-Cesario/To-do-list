import { ICreateList, IRenameList, RCreateList, RRenameList } from "@/services/interfaces/list";
import { listQueries } from "@/services/queries/list";
import { useMutation } from "@apollo/client";

export const useMutationsList = () => {
	const [createListMutation] = useMutation<RCreateList, ICreateList>(listQueries.CREATE_LIST);
	const [renameListMutation] = useMutation<RRenameList, IRenameList>(listQueries.RENAME_LIST);

	const createListRequest = async (variables: ICreateList) => await createListMutation({ variables });
	const renameListRequest = async (variables: IRenameList) => await renameListMutation({ variables });

	return { createListRequest, renameListRequest };
};
