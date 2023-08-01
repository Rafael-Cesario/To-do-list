import request from "supertest-graphql";
import { prisma } from "../../database";
import { InterfaceUser } from "../../interfaces/user";
import { startServer } from "../../server";
import { createLists, createUser } from "../__utils__/create";
import { listQueries } from "../__utils__/queries/list";
import { IList } from "../../interfaces/list";

describe("List - Rename list", () => {
	let user: InterfaceUser;
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

	it("Throw error due to empty values", async () => {
		const input = { listID: "", userID: "", newName: "" };
		const { errors } = await request(url).mutate(listQueries.RENAME_LIST).variables({ input });
		expect(errors![0].message).toBe("missingFields: userID has no value, listID has no value, newName has no value");
	});

	it("Throw error due to user not found", async () => {
		const input = { listID: lists[0].listID, userID: "wrong", newName: "this is a new name" };
		const { errors } = await request(url).mutate(listQueries.RENAME_LIST).variables({ input });
		expect(errors![0].message).toBe("notFound: User not found");
	});

	it("Throw error due to duplicated list name", async () => {
		const input = { listID: lists[0].listID, userID: user.id, newName: lists[1].name };
		const { errors } = await request(url).mutate(listQueries.RENAME_LIST).variables({ input });
		expect(errors![0].message).toBe("duplicated: This list already exist");
	});

	it("Throw error due to list not found", async () => {
		const input = { listID: "Wrong", userID: user.id, newName: "A new name" };
		const { errors } = await request(url).mutate(listQueries.RENAME_LIST).variables({ input });
		expect(errors![0].message).toBe("notFound: List not found");
	});

	it("Rename a list and return it", async () => {
		const listName = "A NEW NAME";
		const input = { listID: lists[0].listID, userID: user.id, newName: listName };
		const { data } = await request<{ renameList: IList }>(url).mutate(listQueries.RENAME_LIST).variables({ input });

		expect(data?.renameList.listID).toBeDefined();
		expect(data?.renameList.userID).toBeDefined();
		expect(data?.renameList.name).toBe(listName.toLowerCase());
	});
});
