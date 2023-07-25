import { INewUser } from "../interfaces/user";

class UserServices {
	createUser({ newUser }: INewUser) {
		console.log({ newUser });
	}
}

export const userServices = new UserServices();
