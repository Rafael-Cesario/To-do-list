import { ITask } from "./task";

export interface IList {
	id: string;
	userID: string;
	name: string;
	tasks?: ITask[];
}

export interface IGetLists {
	getListData: {
		userID: string;
	};
}

export interface RGetLists {
	lists: IList[];
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
