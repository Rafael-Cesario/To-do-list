export type CookieKeys = "user";

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

export interface IGetCookies {
	key: string;
}
