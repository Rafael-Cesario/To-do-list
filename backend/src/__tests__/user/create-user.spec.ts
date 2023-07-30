import request from "supertest-graphql";
import { startServer } from "../../server";
import { prisma } from "../../database";
import { userQueries } from "../queries/user";

describe("User - create user", () => {
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

	it.only("Throw a error due to empty values", async () => {
		const newUser = { email: "", name: "", password: "" };
		const { errors } = await request(url).mutate(userQueries.CREATE_USER).variables({ newUser });
		expect(errors![0].message).toBe("email has no value, name has no value, password has no value");
	});

	it.todo("Throw a error due to duplicated user");

	it.todo("Create a new user with and return a message");

	it.todo("Crypt the user password");

	it.todo("Transform the user email to lowercase");
});
