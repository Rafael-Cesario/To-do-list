import { prisma } from "../database";

class SubjectService {
	async getSubjects({ listID }: { listID: string }) {
		const subjects = await prisma.subject.findMany({ where: { listID } });
		return subjects;
	}
}

export const subjectService = new SubjectService();
