export interface IUser {
	id: string;
	email: string;
	name: string;
	password: string;
}

export interface INewUser {
	newUser: IUser;
}
