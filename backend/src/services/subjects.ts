import { GraphQLError } from "graphql";
import { prisma } from "../database";
import { ICreateSubject } from "../interfaces/subjects";
import { searchEmptyValues } from "../utils/search-empty-values";

class SubjectService {
	async getSubjects({ listID }: { listID: string }) {
		const subjects = await prisma.subject.findMany({ where: { listID }, include: { tags: true } });
		return subjects;
	}

	async createSubject({ input }: ICreateSubject) {
		const emptyValues = searchEmptyValues(input);
		if (emptyValues) throw new GraphQLError("missingFields: " + emptyValues);

		input.name = input.name.toLowerCase();

		const subjects = await prisma.subject.findMany({ where: { listID: input.listID, name: input.name } });
		if (subjects.length > 0) throw new GraphQLError("duplicated: A subject with the same name already exist.");

		const newSubject = await prisma.subject.create({ data: { name: input.name, listID: input.listID }, include: { tags: true } });
		return newSubject;
	}
}

export const subjectService = new SubjectService();
