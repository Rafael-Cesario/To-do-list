import request from "supertest-graphql";
import { prisma } from "../../database";
import { IUser } from "../../interfaces/user";
import { startServer } from "../../server";
import { createUser } from "../__utils__/create";
import { tagQueries } from "../__utils__/queries/tags";
import { ITag } from "../../interfaces/tags";

describe("Tags", () => {
	let url: string;
	let user: IUser;

	const clearDatabase = async () => {
		await prisma.tags.deleteMany();
		await prisma.user.deleteMany();
	};

	beforeAll(async () => {
		await prisma.$connect();
		url = await startServer(0);
		user = await createUser();
	});

	afterAll(async () => {
		await clearDatabase();
	});

	describe("Create tag", () => {
		afterEach(async () => {
			await prisma.tags.deleteMany();
		});

		it("Throws an error due to empty values", async () => {
			const { errors } = await request(url)
				.mutate(tagQueries.CREATE_TAG)
				.variables({ input: { userID: "", name: "", color: "" } });

			expect(errors?.[0].message).toBe("missingFields: userID has no value, name has no value, color has no value");
		});

		it("Throws an error user was not found", async () => {
			const { errors } = await request(url)
				.mutate(tagQueries.CREATE_TAG)
				.variables({ input: { userID: "wrong", name: "qwe", color: "2050dd" } });

			expect(errors?.[0].message).toBe("User not found");
		});

		it("Throws a error due to duplicated tag name", async () => {
			await request(url)
				.mutate(tagQueries.CREATE_TAG)
				.variables({ input: { userID: user.id, name: "tag 01", color: "2050dd" } });

			const { errors } = await request(url)
				.mutate(tagQueries.CREATE_TAG)
				.variables({ input: { userID: user.id, name: "tag 01", color: "2050dd" } });

			expect(errors?.[0].message).toBe("duplicated: A tag with the same name already exist");
		});

		it("Creates a new tag", async () => {
			const tagName = "TAG 01";

			const { data } = await request<{ createTag: ITag }>(url)
				.mutate(tagQueries.CREATE_TAG)
				.variables({ input: { userID: user.id, name: tagName, color: "2050dd" } });

			expect(data?.createTag).toBeDefined();
			expect(data?.createTag.name).toBe(tagName.toLowerCase());
		});
	});
});
