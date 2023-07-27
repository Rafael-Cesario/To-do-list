export interface IUser {
	id: string;
	email: string;
	name: string;
	password: string;
}

export interface INewUser {
	newUser: IUser;
}

export interface IUser {
	user: {
		email: string;
		password: string;
	};
}
