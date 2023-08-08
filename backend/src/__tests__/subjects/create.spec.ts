import request from "supertest-graphql";
import { startServer } from "../../server";
import { prisma } from "../../database";
import { subjectQueries } from "../__utils__/queries/subject";
import { IUser } from "../../interfaces/user";
import { createLists, createUser } from "../__utils__/create";
import { IList } from "../../interfaces/list";
import { ISubject } from "../../interfaces/subjects";

describe("Create subject", () => {
	let url: string;
	let user: IUser;
	let lists: IList[];

	const clearDatabase = async () => {
		await prisma.list.deleteMany();
		await prisma.user.deleteMany();
	};

	beforeAll(async () => {
		url = await startServer(0);
		await prisma.$connect();
		user = await createUser();
		lists = await createLists(1, user.id);
	});

	afterEach(async () => {
		await prisma.subject.deleteMany();
	});

	afterAll(async () => {
		await clearDatabase();
	});

	it("Throws error due to missing fields", async () => {
		const { errors } = await request(url)
			.mutate(subjectQueries.CREATE_SUBJECT)
			.variables({ input: { listID: "", name: "" } });

		expect(errors?.[0].message).toBe("missingFields: listID has no value, name has no value");
	});

	it("Throws a error due to duplicated name", async () => {
		await request(url)
			.mutate(subjectQueries.CREATE_SUBJECT)
			.variables({ input: { listID: lists[0].listID, name: "tag01" } });

		const { errors } = await request(url)
			.mutate(subjectQueries.CREATE_SUBJECT)
			.variables({ input: { listID: lists[0].listID, name: "tag01" } });

		expect(errors?.[0].message).toBe("duplicated: A subject with the same name already exist.");
	});

	it("Create a new subject", async () => {
		const { data } = await request<{ createSubject: ISubject }>(url)
			.mutate(subjectQueries.CREATE_SUBJECT)
			.variables({ input: { listID: lists[0].listID, name: "tag01" } });

		expect(data?.createSubject).toBeDefined();
	});
});
