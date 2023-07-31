import request from "supertest-graphql";
import { prisma } from "../../database";
import { startServer } from "../../server";
import { listQueries } from "../__queries__/list";
import { ICreateList } from "../../interfaces/list";

describe("List - Create list", () => {
	let user: { id: string };
	let url = "";

	beforeAll(async () => {
		url = await startServer(0);
		await prisma.$connect();
		user = await prisma.user.create({ data: { email: "user@test.com", name: "user", password: "123" } });
	});

	afterAll(async () => {
		await prisma.list.deleteMany();
		await prisma.user.deleteMany();
		await prisma.$disconnect();
	});

	it("Throw error due to empty values", async () => {
		const { errors } = await request(url)
			.mutate(listQueries.CREATE_LIST)
			.variables({ input: { userID: "", name: "" } });

		expect(errors![0].message).toBe("missingFields: userID has no value, name has no value");
	});

	it.todo("Throw error due to user not found");

	it.todo("Throw error due to a duplicated name");

	it.todo("Create a new list");
});
