import { ISubject } from "@/services/interfaces/subjects";

interface ISortSubjects {
	increasingAmount: (subjects: ISubject[]) => ISubject[];
	decreasingAmount: (subjects: ISubject[]) => ISubject[];
	increasingDate: (subjects: ISubject[]) => ISubject[];
	decreasingDate: (subjects: ISubject[]) => ISubject[];
}

export class SortSubject implements ISortSubjects {
	decreasingAmount(subjects: ISubject[]) {
		const newSubjects = subjects.sort((subjectA, subjectB) => subjectB.amount - subjectA.amount);
		return newSubjects;
	}

	increasingAmount(subjects: ISubject[]) {
		const newSubjects = subjects.sort((subjectA, subjectB) => subjectA.amount - subjectB.amount);
		return newSubjects;
	}

	decreasingDate(subjects: ISubject[]) {
		const newSubjects = subjects.sort((subjectA, subjectB) => Number(subjectB.date) - Number(subjectA.date));
		return newSubjects;
	}

	increasingDate(subjects: ISubject[]) {
		const newSubjects = subjects.sort((subjectA, subjectB) => Number(subjectA.date) - Number(subjectB.date));
		return newSubjects;
	}
}
