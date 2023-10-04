import request from "supertest-graphql";
import { prisma } from "../../database";
import { IList } from "../../interfaces/list";
import { ISubject } from "../../interfaces/subjects";
import { IUser } from "../../interfaces/user";
import { startServer } from "../../server";
import { createUser, createLists } from "../__utils__/create";
import { subjectQueries } from "../__utils__/queries/subject";

describe("Delete subject", () => {
	let url: string;
	let user: IUser;
	let lists: IList[];
	let subject: ISubject;

	const clearDatabase = async () => {
		await prisma.subject.deleteMany();
		await prisma.list.deleteMany();
		await prisma.user.deleteMany();
	};

	const createSubject = async () => {
		const { data } = await request<{ createSubject: ISubject }>(url)
			.mutate(subjectQueries.CREATE_SUBJECT)
			.variables({ input: { listID: lists[0].listID, name: "subject-01" } });

		return data!.createSubject;
	};

	beforeAll(async () => {
		url = await startServer(0);
		await prisma.$connect();
		user = await createUser();
		lists = await createLists(1, user.id);
		subject = await createSubject();
	});

	afterAll(async () => {
		await clearDatabase();
	});

	it("Throws an error due to missing fields", async () => {
		const { errors } = await request(url).mutate(subjectQueries.DELETE_SUBJECT).variables({ subjectID: "" });
		expect(errors?.[0].message).toBe("missingFields: subjectID is required");
	});

	it("Throws an error due to subject not found", async () => {
		const { errors } = await request(url).mutate(subjectQueries.DELETE_SUBJECT).variables({ subjectID: "wrong" });
		expect(errors?.[0].message).toBe("notFound: Subject was not found");
	});

	it("Delete a subject from the database", async () => {
		let subjects = await prisma.subject.findMany();
		expect(subjects).toHaveLength(1);

		const { data } = await request<{ deleteSubject: string }>(url).mutate(subjectQueries.DELETE_SUBJECT).variables({ subjectID: subject.subjectID });
		expect(data?.deleteSubject).toBe("Success: Subject deleted");

		subjects = await prisma.subject.findMany();
		expect(subjects).toHaveLength(0);
	});
});
