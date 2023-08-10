export interface ISubject {
	listID: string;
	subjectID: string;
	name: string;
	date: string;
	amount: number;
	notes: string;
	tags: string[];
}

export interface IGetSubjects {
	listID: string;
}

export interface RGetSubjects {
	getSubjects: ISubject[];
}

export interface ICreateSubject {
	input: {
		listID: string;
		name: string;
	};
}

export interface RCreateSubject {
	createSubject: ISubject;
}

export interface IUpdateSubject {
	input: {
		subjectID: string;
		name: string;
		amount: number;
		notes: string;
		tags: string[];
	};
}

export interface IDeleteSubject {
	subjectID: string;
}
