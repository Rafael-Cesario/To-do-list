import { RCreateUser, ICreateUser, ILogin, RLogin } from "@/services/interfaces/user";
import { userQueries } from "@/services/queries/user";
import { useMutation } from "@apollo/client";

export const useMutationsUser = () => {
	const [createUserMutation] = useMutation<RCreateUser, ICreateUser>(userQueries.CREATE_USER);
	const [loginMutation] = useMutation<RLogin, ILogin>(userQueries.LOGIN);

	const createUserRequest = async (variables: ICreateUser) => await createUserMutation({ variables });
	const loginRequest = async (variables: ILogin) => await loginMutation({ variables });

	return { createUserRequest, loginRequest };
};
