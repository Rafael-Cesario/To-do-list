export interface ISetCookies {
	key: string;
	value: string;
	maxAge: number;
}

export interface IUserCookies {
	email: string;
	token: string;
	userID: string;
}
