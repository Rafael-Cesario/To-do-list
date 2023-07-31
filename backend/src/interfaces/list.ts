export interface ICreateList {
	input: {
		userID: string;
		name: string;
	};
}

export interface IRenameList {
	input: {
		userID: string;
		listID: string;
		newName: string;
	};
}

export interface IDeleteList {
	input: {
		listID: string;
	};
}
