import { prisma } from "../../database";
import { startServer } from "../../server";

describe("User - Login", () => {
	let url = "";

	beforeAll(async () => {
		url = await startServer(0);
		await prisma.$connect();
	});

	afterAll(async () => {
		await prisma.$disconnect();
	});

	it.todo("Throw error due to empty values");

	it.todo("Throw error due to invalid email");

	it.todo("Throw error due to invalid password");

	it.todo("Returns a token");
});
