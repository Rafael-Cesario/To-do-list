import cookie from "cookie";

export async function POST(req: Request) {
	const body = await req.json();

	const options: cookie.CookieSerializeOptions = {
		httpOnly: true,
		secure: process.env.NODE_ENV !== "development",
		maxAge: body.maxAge,
		sameSite: "strict",
		path: "/",
	};

	return new Response("Cookie set", {
		headers: { "Set-Cookie": cookie.serialize(body.key, body.value, options) },
	});
}
