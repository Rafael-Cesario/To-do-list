import cookie from "cookie";
import { ISetCookies } from "@/services/interfaces/cookies";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: Request, { params }: { params: { key: string } }) {
	const store = cookies();
	const data = store.get(params.key);
	const userCookies = JSON.parse(data?.value || "");
	return NextResponse.json({ ...userCookies });
}

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

export async function DELETE(req: Request, { params }: { params: { key: string } }) {
	const store = cookies();
	store.delete(params.key);
	return NextResponse.json({ message: "Success" });
}
