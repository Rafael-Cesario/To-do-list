export interface ISubject {
	listID: string;
	subjectID: string;
	name: string;
	date: string;
	amount: number;
	notes: string;
	tags: string[];
}

export interface ICreateSubject {
	input: {
		listID: string;
		name: string;
	};
}

export interface IUpdateSubject {
	input: ISubject;
}
