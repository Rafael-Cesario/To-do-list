import { ITagColors } from "@/features/home/components/header/interfaces/task";

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
	NEXT = "NEXT",
	CURRENT = "CURRENT",
	DONE = "DONE",
}

export interface ICreateTask {
	createTaskData: {
		listID: string;
		title: string;
		description: string;
		status: Status;
		tags: {
			name: string;
			color: keyof ITagColors;
		}[];
	};
}

export interface RCreateTask {
	createTask: ITask;
}
