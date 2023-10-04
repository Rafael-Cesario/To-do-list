import request from "supertest-graphql";
import { prisma } from "../../database";
import { IList } from "../../interfaces/list";
import { IUser } from "../../interfaces/user";
import { startServer } from "../../server";
import { createLists, createUser } from "../__utils__/create";
import { subjectQueries } from "../__utils__/queries/subject";
import { ISubject } from "../../interfaces/subjects";

describe("Get subjects", () => {
	let url: string;
	let user: IUser;
	let lists: IList[];

	const clearDatabase = async () => {
		await prisma.subject.deleteMany();
		await prisma.list.deleteMany();
		await prisma.user.deleteMany();
	};

	beforeAll(async () => {
		url = await startServer(0);
		await prisma.$connect();
		user = await createUser();
		lists = await createLists(1, user.id);
	});

	afterAll(async () => {
		await clearDatabase();
	});

	it("Did not find the list", async () => {
		const { errors, data } = await request(url).query(subjectQueries.GET_SUBJECTS).variables({ listID: "123" });
		expect(errors).toBeUndefined();
		expect(data).toHaveProperty("getSubjects", []);
	});

	it("Return all the subjects", async () => {
		await request(url)
			.mutate(subjectQueries.CREATE_SUBJECT)
			.variables({ input: { listID: lists[0].listID, name: "subject-01" } });

		const { data } = await request<{ getSubjects: ISubject[] }>(url).query(subjectQueries.GET_SUBJECTS).variables({ listID: lists[0].listID });
		expect(data?.getSubjects).toHaveLength(1);
	});
});
