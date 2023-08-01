import request from "supertest-graphql";
import { prisma } from "../../database";
import { InterfaceUser } from "../../interfaces/user";
import { startServer } from "../../server";
import { listQueries } from "../__queries__/list";

describe("List - Get lists", () => {
	let user: InterfaceUser;
	let url = "";

	const createUser = async () => {
		const user = await prisma.user.create({ data: { email: "user@test.com", name: "user", password: "123" } });
		return user;
	};

	const createLists = async (amount: number) => {
		let listNumber = 0;
		for (listNumber; listNumber < amount; listNumber++) {
			await prisma.list.create({ data: { userID: user.id, name: `list${listNumber}` } });
		}
	};

	beforeAll(async () => {
		url = await startServer(0);
		await prisma.$connect();
		user = await createUser();
		await createLists(3);
	});

	afterAll(async () => {
		await prisma.$disconnect();
		await prisma.list.deleteMany();
		await prisma.user.deleteMany();
	});

	it("Throw a error if user id is empty", async () => {
		const { errors } = await request(url).mutate(listQueries.GET_LISTS).variables({ userID: "" });
		expect(errors![0].message).toBe("missingFields: userId is required");
	});

	it("Throw a errro if user was not found", async () => {
		const { errors } = await request(url).mutate(listQueries.GET_LISTS).variables({ userID: "wrong" });
		expect(errors![0].message).toBe("notFound: User not found");
	});

	it.todo("Returns all the lists of a user");
});
