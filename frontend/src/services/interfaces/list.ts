import { ITask } from "./task";

export interface IList {
	id: string;
	userID: string;
	name: string;
	tasks: ITask[];
}

export interface IGetLists {
	getListData: {
		userID: string;
	};
}

export interface RGetLists {
	getLists: IList[];
}

export interface ICreateList {
	createListData: {
		userID: string;
		name: string;
	};
}

export interface RCreateList {
	createList: IList;
}

export interface IUpdateList {
	updateListData: {
		listID: string;
		newName: string;
	};
}

export interface RUpdateList {
	updateList: IList;
}

export interface IDeleteList {
	deleteListData: {
		listID: string;
	};
}

export interface RDeleteList {
	deleteList: string;
}
