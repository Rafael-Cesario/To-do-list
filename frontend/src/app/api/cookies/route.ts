import cookie from "cookie";
import { ISetCookies } from "@/services/interfaces/cookies";

export async function POST(req: Request) {
	const { key, maxAge, value }: ISetCookies = await req.json();

	return new Response("Cookies", {
		status: 200,
		headers: {
			"Set-Cookie": cookie.serialize(key, value, {
				httpOnly: true,
				maxAge,
				path: "/",
				sameSite: "strict",
				secure: process.env.NODE_ENV !== "development",
			}),
		},
	});
}
