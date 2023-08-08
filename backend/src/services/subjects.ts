import { GraphQLError } from "graphql";
import { prisma } from "../database";
import { ICreateSubject, IDeleteSubject, IUpdateSubject } from "../interfaces/subjects";
import { searchEmptyValues } from "../utils/search-empty-values";

class SubjectService {
	async getSubjects({ listID }: { listID: string }) {
		const subjects = await prisma.subject.findMany({ where: { listID } });
		return subjects;
	}

	async createSubject({ input }: ICreateSubject) {
		const emptyValues = searchEmptyValues(input);
		if (emptyValues) throw new GraphQLError("missingFields: " + emptyValues);

		input.name = input.name.toLowerCase();

		const subjects = await prisma.subject.findMany({ where: { listID: input.listID, name: input.name } });
		if (subjects.length > 0) throw new GraphQLError("duplicated: A subject with the same name already exist.");

		const newSubject = await prisma.subject.create({ data: { name: input.name, listID: input.listID } });
		return newSubject;
	}

	async updateSubject({ input }: IUpdateSubject) {
		const { amount, name, notes, tags, subjectID } = input;

		const emptyValues = searchEmptyValues({ name, notes });
		if (emptyValues) throw new GraphQLError("missingFields: " + emptyValues);

		const hasSubject = await prisma.subject.findUnique({ where: { subjectID } });
		if (!hasSubject) throw new GraphQLError("notFound: Subject was not found");

		await prisma.subject.update({ where: { subjectID }, data: { amount, name, notes, tags } });
		return `Success: ${input.name} was updated.`;
	}

	async deleteSubject({ subjectID }: IDeleteSubject) {
		if (!subjectID) throw new GraphQLError("missingFields: subjectID is required");

		try {
			await prisma.subject.delete({ where: { subjectID } });
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			throw new GraphQLError(`${error.code}: ${error.meta.cause}`);
		}

		return "Success: Subject deleted";
	}
}

export const subjectService = new SubjectService();
