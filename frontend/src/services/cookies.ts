import { ISetCookies } from "./interfaces/cookies";

class Cookies {
	readonly keys = {
		user: "user",
	};

	async set(cookies: ISetCookies) {
		const response = await fetch("/api/cookies", {
			headers: { "Content-Type": "application/json" },
			method: "POST",
			body: JSON.stringify(cookies),
		});

		return response;
	}
}

export const cookies = new Cookies();
