export interface IUser {
	id: string;
	email: string;
	name: string;
	createdAt: string;
}

export interface RCreateUser {
	createUser: IUser;
}

export interface ICreateUser {
	createUserData: {
		email: string;
		name: string;
		password: string;
	};
}
