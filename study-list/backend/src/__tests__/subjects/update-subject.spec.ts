import request from "supertest-graphql";
import { prisma } from "../../database";
import { IList } from "../../interfaces/list";
import { IUser } from "../../interfaces/user";
import { startServer } from "../../server";
import { createLists, createUser } from "../__utils__/create";
import { subjectQueries } from "../__utils__/queries/subject";
import { ISubject } from "../../interfaces/subjects";

describe("Update subject", () => {
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

	it("Throws an error due to empty values", async () => {
		const { errors } = await request(url)
			.mutate(subjectQueries.UPDATE_SUBJECT)
			.variables({ input: { subjectID: "", name: "", amount: 0, tags: [], notes: "" } });

		expect(errors?.[0].message).toBe("missingFields: name has no value, notes has no value");
	});

	it("Throws a error if the subject doesn't exist", async () => {
		const { errors } = await request(url)
			.mutate(subjectQueries.UPDATE_SUBJECT)
			.variables({ input: { subjectID: "wrong", name: "subject 01", amount: 0, tags: [], notes: "My notes" } });

		expect(errors?.[0].message).toBe("notFound: Subject was not found");
	});

	it("Update a subjct", async () => {
		const newSubject = {
			subjectID: subject.subjectID,
			name: "New name",
			notes: "My notes",
			amount: 1,
			tags: ["123", "321"],
		};

		const { data } = await request<{ updateSubject: string }>(url).mutate(subjectQueries.UPDATE_SUBJECT).variables({ input: newSubject });
		expect(data?.updateSubject).toMatch(/Success/);

		const subjectDatabase = await prisma.subject.findUnique({ where: { subjectID: subject.subjectID } });
		expect(subjectDatabase).toHaveProperty("name", newSubject.name);
		expect(subjectDatabase).toHaveProperty("notes", newSubject.notes);
		expect(subjectDatabase).toHaveProperty("amount", newSubject.amount);
		expect(subjectDatabase).toHaveProperty("tags", newSubject.tags);
	});
});
