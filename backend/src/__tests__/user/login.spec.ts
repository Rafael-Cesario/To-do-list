import request from "supertest-graphql";
import { prisma } from "../../database";
import { startServer } from "../../server";
import { userQueries } from "../queries/user";

describe("User - Login", () => {
	const defaultUser = { email: "user@test.com", password: "123" };
	let url = "";

	beforeAll(async () => {
		url = await startServer(0);
		await prisma.$connect();
		await prisma.user.create({ data: { ...defaultUser, name: "user" } });
	});

	afterAll(async () => {
		await prisma.user.deleteMany();
		await prisma.$disconnect();
	});

	it("Throw error due to empty values", async () => {
		const { errors } = await request(url)
			.mutate(userQueries.LOGIN)
			.variables({ user: { email: "", password: "" } });

		expect(errors![0].message).toBe("email has no value, password has no value");
	});

	it.todo("Throw error due to invalid email");

	it.todo("Throw error due to invalid password");

	it.todo("Returns a token");
});
