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
