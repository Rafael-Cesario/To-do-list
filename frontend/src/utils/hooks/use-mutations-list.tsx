import { ICreateList, RCreateList } from "@/services/interfaces/list";
import { listQueries } from "@/services/queries/list";
import { useMutation } from "@apollo/client";

export const useMutationsList = () => {
	const [createListMutation] = useMutation<RCreateList, ICreateList>(listQueries.CREATE_LIST);

	const createListRequest = async (variables: ICreateList) => await createListMutation({ variables });

	return { createListRequest };
};
