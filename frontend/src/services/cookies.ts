import { CookieKeys, ISetCookies } from "./interfaces/cookies";

class Cookies {
	readonly keys = {
		user: "user",
	};

	async set(key: CookieKeys, cookies: ISetCookies) {
		const response = await fetch("/api/cookies/" + key, {
			headers: { "Content-Type": "application/json" },
			method: "POST",
			body: JSON.stringify(cookies),
		});

		return response;
	}

	async get(key: CookieKeys) {
		const response = await fetch("/api/cookies/" + key);
		return await response.json();
	}

	async delete(key: CookieKeys) {
		const response = await fetch("/api/cookies/" + key, {
			headers: { "Content-Type": "application/json" },
			method: "DELETE",
		});

		return await response.json();
	}
}

export const cookies = new Cookies();
