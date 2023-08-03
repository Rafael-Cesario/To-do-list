export interface IUser {
	id?: string;
	email: string;
	name: string;
	password: string;
}

export interface ICreateUser {
	newUser: IUser;
}

export interface RCreateUser {
	createUser: { message: string };
}

export interface ILogin {
	user: {
		email: string;
		password: string;
	};
}

export interface RLogin {
	login: { token: string; userID: string };
}
