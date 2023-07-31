import request from "supertest-graphql";
import { startServer } from "../../server";
import { prisma } from "../../database";
import { userQueries } from "../__queries__/user";

describe("User - create user", () => {
	const defaultUser = { email: "USER@test.com", name: "user", password: "123" };
	let url = "";

	beforeAll(async () => {
		url = await startServer(0);
		await prisma.$connect();
	});

	afterEach(async () => {
		await prisma.user.deleteMany();
	});

	afterAll(async () => {
		await prisma.$disconnect();
	});

	it("Throw a error due to empty values", async () => {
		const newUser = { email: "", name: "", password: "" };
		const { errors } = await request(url).mutate(userQueries.CREATE_USER).variables({ newUser });
		expect(errors![0].message).toBe("email has no value, name has no value, password has no value");
	});

	it("Throw a error due to duplicated user", async () => {
		await request(url).mutate(userQueries.CREATE_USER).variables({ newUser: defaultUser });
		const { errors } = await request(url).mutate(userQueries.CREATE_USER).variables({ newUser: defaultUser });
		expect(errors![0].message).toBe("duplicated: A user with the same email already exist");
	});

	it("Create a new user, with lowercase email and encrypted password", async () => {
		const { data } = await request<{ createUser: { message: string } }>(url).mutate(userQueries.CREATE_USER).variables({ newUser: defaultUser });
		expect(data?.createUser.message).toBe("Success: A new user was created");

		const user = await prisma.user.findFirst({ where: { email: defaultUser.email.toLowerCase() } });
		expect(user?.email).toBe(defaultUser.email.toLowerCase());
		expect(user?.password).not.toBe(defaultUser.password);
	});
});
