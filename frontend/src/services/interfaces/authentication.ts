export interface ILogin {
	loginData: {
		email: string;
		password: string;
	};
}

export interface RLogin {
	login: {
		userID: string;
		email: string;
		token: string;
		name: string;
	};
}
