export interface InterfaceUser {
	id: string;
	email: string;
	name: string;
	password: string;
}

export interface INewUser {
	newUser: InterfaceUser;
}

export interface ILogin {
	user: {
		email: string;
		password: string;
	};
}
