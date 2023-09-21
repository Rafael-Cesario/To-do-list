export interface ITask {
	id: string;
	listID: string;
	title: string;
	description: string;
	createdAt: Date;
	status: Status;
	tags: ITag[];
}

export interface ITag {
	id: string;
	taskID: string;
	name: string;
	color: string;
}

export enum Status {
	NEXT,
	CURRENT,
	DONE,
}
