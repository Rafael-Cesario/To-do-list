import { RCreateUser, ICreateUser } from "@/services/interfaces/user";
import { userQueries } from "@/services/queries/user";
import { useMutation } from "@apollo/client";

export const useMutationsUser = () => {
	const [createUserMutation] = useMutation<RCreateUser, ICreateUser>(userQueries.CREATE_USER);
	const createUserRequest = async (variables: ICreateUser) => await createUserMutation({ variables });
	return { createUserRequest };
};
