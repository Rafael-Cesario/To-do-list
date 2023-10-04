import request from "supertest-graphql";
import { prisma } from "../../database";
import { IList } from "../../interfaces/list";
import { IUser } from "../../interfaces/user";
import { startServer } from "../../server";
import { createUser, createLists } from "../__utils__/create";
import { listQueries } from "../__utils__/queries/list";

describe("List - Delete", () => {
	let user: IUser;
	let lists: IList[];
	let url = "";

	beforeAll(async () => {
		url = await startServer(0);
		await prisma.$connect();
		user = await createUser();
		lists = await createLists(3, user.id);
	});

	afterAll(async () => {
		await prisma.$disconnect();
		await prisma.list.deleteMany();
		await prisma.user.deleteMany();
	});

	it("Throw a error due to list not found", async () => {
		let input = { listID: "" };
		let { errors } = await request(url).mutate(listQueries.DELETE_LIST).variables({ input });
		expect(errors![0].message).toBe("notFound: List not found");

		input = { listID: "wrong" };
		({ errors } = await request(url).mutate(listQueries.DELETE_LIST).variables({ input }));
		expect(errors![0].message).toBe("notFound: List not found");
	});

	it("Delete a list", async () => {
		const input = { listID: lists[0].listID };
		const { data } = await request<{ deleteList: string }>(url).mutate(listQueries.DELETE_LIST).variables({ input });
		expect(data?.deleteList).toBe("success: List deleted");
	});
});
