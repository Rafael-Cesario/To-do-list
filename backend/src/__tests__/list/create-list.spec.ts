import request from "supertest-graphql";
import { prisma } from "../../database";
import { startServer } from "../../server";
import { listQueries } from "../__queries__/list";

describe("List - Create list", () => {
	let user: { id: string };
	let url = "";

	beforeAll(async () => {
		url = await startServer(0);
		await prisma.$connect();
		user = await prisma.user.create({ data: { email: "user@test.com", name: "user", password: "123" } });
	});

	afterEach(async () => {
		await prisma.list.deleteMany();
	});

	afterAll(async () => {
		await prisma.user.deleteMany();
		await prisma.$disconnect();
	});

	it("Throw error due to empty values", async () => {
		const { errors } = await request(url)
			.mutate(listQueries.CREATE_LIST)
			.variables({ input: { userID: "", name: "" } });

		expect(errors![0].message).toBe("missingFields: userID has no value, name has no value");
	});

	it("Throw error due to user not found", async () => {
		const { errors } = await request(url)
			.mutate(listQueries.CREATE_LIST)
			.variables({ input: { userID: "wrong", name: "user" } });

		expect(errors![0].message).toBe("notFound: User not found");
	});

	it("Throw error due to a duplicated name", async () => {
		await request(url)
			.mutate(listQueries.CREATE_LIST)
			.variables({ input: { userID: user.id, name: "list01" } });

		const { errors } = await request(url)
			.mutate(listQueries.CREATE_LIST)
			.variables({ input: { userID: user.id, name: "list01" } });

		expect(errors![0].message).toBe("duplicated: This list already exist");
	});

	it("Create a new list", async () => {
		const listName = "LIST01";

		const { data } = await request<{ createList: { listID: string; userID: string; name: string } }>(url)
			.mutate(listQueries.CREATE_LIST)
			.variables({ input: { userID: user.id, name: listName } });

		expect(data?.createList).toHaveProperty("listID");
		expect(data?.createList).toHaveProperty("userID");
		expect(data?.createList).toHaveProperty("name", listName.toLowerCase());
	});
});
