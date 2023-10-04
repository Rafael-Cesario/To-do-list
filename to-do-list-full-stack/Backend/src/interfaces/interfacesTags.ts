export interface InputCreateTag {
	email: string;
	listName: string;
	id: string;
	tag: string;
}

export interface InputUpdateTag {
	email: string;
	listName: string;
	id: string;
	oldTag: string;
	newTag: string;
}

export interface InputDeleteTag {
	email: string;
	listName: string;
	id: string;
	tag: string;
}
