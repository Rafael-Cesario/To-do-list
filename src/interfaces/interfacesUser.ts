export interface InputUser {
	name: string;
	email: string;
	password: string;
}

export interface InputUpdateUser {
	email: string;
	update: {
		email?: string;
		name?: string;
		password?: string;
	};
}
