export type CookieKeys = "user";

export interface SetCookies {
	key: CookieKeys;
	value: string;
	maxAge: number;
}

export interface UserCookies {
	userID: string;
	email: string;
	token: string;
}
