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

	describe("Get tags", () => {
		afterEach(async () => {
			await prisma.tags.deleteMany();
		});

		it("Throws an error due to user not found", async () => {
			const { errors } = await request(url).mutate(tagQueries.GET_TAG).variables({ userID: "" });
			expect(errors?.[0].message).toBe("User not found");
		});

		it("Returns all the tags", async () => {
			await request<{ createTag: ITag }>(url)
				.mutate(tagQueries.CREATE_TAG)
				.variables({ input: { userID: user.id, name: "tag 01", color: "2050dd" } });

			const { data } = await request<{ getTags: ITag[] }>(url).mutate(tagQueries.GET_TAG).variables({ userID: user.id });
			expect(data?.getTags).toHaveLength(1);
		});
	});

	describe("Update tag", () => {
		afterEach(async () => {
			await prisma.tags.deleteMany();
		});

		it("Throws an error due to empty values", async () => {
			const { errors } = await request(url)
				.mutate(tagQueries.UPDATE_TAG)
				.variables({ input: { tagID: "", name: "", color: "" } });
			expect(errors?.[0].message).toBe("missingFields: tagID has no value, name has no value, color has no value");
		});

		it("Throws an error, tag was not found", async () => {
			const { errors } = await request(url)
				.mutate(tagQueries.UPDATE_TAG)
				.variables({ input: { tagID: "wrong", name: "tag 01", color: "222444" } });
			expect(errors?.[0].message).toBe("notFound: Tag was not found");
		});

		it("Throws an error due to duplicated name", async () => {
			await request<{ createTag: ITag }>(url)
				.mutate(tagQueries.CREATE_TAG)
				.variables({ input: { userID: user.id, name: "tag 01", color: "2050dd" } });

			const createTag = await request<{ createTag: ITag }>(url)
				.mutate(tagQueries.CREATE_TAG)
				.variables({ input: { userID: user.id, name: "tag 02", color: "2050dd" } });

			const tag = createTag.data?.createTag;

			const { errors } = await request(url)
				.mutate(tagQueries.UPDATE_TAG)
				.variables({ input: { tagID: tag?.tagID, name: "tag 01", color: "222444" } });

			expect(errors?.[0].message).toBe("duplicated: A tag with the same name already exist");
		});

		it("Update a tag", async () => {
			const createTag = await request<{ createTag: ITag }>(url)
				.mutate(tagQueries.CREATE_TAG)
				.variables({ input: { userID: user.id, name: "tag 01", color: "2050dd" } });

			const tag = createTag.data?.createTag;

			const newTag = { name: "NEW NAME", color: "000999" };

			const { data } = await request<{ updateTag: ITag }>(url)
				.mutate(tagQueries.UPDATE_TAG)
				.variables({ input: { tagID: tag?.tagID, ...newTag } });

			expect(data?.updateTag).toBeDefined();
			expect(data?.updateTag.name).toBe(newTag.name.toLowerCase());
			expect(data?.updateTag.color).toBe(newTag.color);
		});
	});

	describe("Delete tag", () => {
		it("Throws an error due to tag not found", async () => {
			const { errors } = await request<{ deleteTag: string }>(url).mutate(tagQueries.DELETE_TAG).variables({ tagID: "wrong" });
			expect(errors?.[0].message).toBe("notFound: Tag was not found");
		});

		it("Delete a tag", async () => {
			const createTag = await request<{ createTag: ITag }>(url)
				.mutate(tagQueries.CREATE_TAG)
				.variables({ input: { userID: user.id, name: "tag 01", color: "2050dd" } });

			const tag = createTag.data?.createTag;

			let tags = await prisma.tags.findMany();
			expect(tags).toHaveLength(1);

			const { data } = await request<{ deleteTag: string }>(url).mutate(tagQueries.DELETE_TAG).variables({ tagID: tag?.tagID });
			expect(data?.deleteTag).toBe("Success: Tag deleted");

			tags = await prisma.tags.findMany();
			expect(tags).toHaveLength(0);
		});
	});
});
