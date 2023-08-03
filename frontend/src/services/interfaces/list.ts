export interface IList {
	listID: string;
	userID: string;
	name: string;
}

export interface ICreateList {
	input: {
		userID: string;
		name: string;
	};
}

export interface RCreateList {
	createList: IList;
}
