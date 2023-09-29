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
	color: keyof ITagColors;
}

export interface ITagColors {
	gray: string;
	red: string;
	brown: string;
	orange: string;
	yellow: string;
	green: string;
	lightBlue: string;
	darkBlue: string;
	purple: string;
	pink: string;
}

export interface ITaskValues {
	title: string;
	description: string;
	status: Status;
	tags: { name: string; color: keyof ITagColors }[];
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
