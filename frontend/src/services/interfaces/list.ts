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

export interface IGetLists {
	userID: string;
}

export interface RGetLists {
	getLists: IList[];
}

export interface IRenameList {
	input: {
		userID: string;
		listID: string;
		newName: string;
	};
}

export interface RRenameList {
	renameList: IList;
}

export interface IDeleteList {
	input: {
		listID: string;
	};
}

export interface RDeleteList {
	deleteList: string;
}
