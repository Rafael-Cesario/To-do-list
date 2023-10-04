export interface InputCreateList {
	email: string;
	listName: string;
}

export interface InputRenameList {
	oldName: string;
	newName: string;
	email: string;
}

export interface InputDeleteList {
	listName: string;
	email: string;
}
