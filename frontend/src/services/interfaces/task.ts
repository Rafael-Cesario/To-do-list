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

export interface TagInput {
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

export interface TaskInput {
	title: string;
	description: string;
	status: Status;
	tags: TagInput[];
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

export interface IUpdateTask {
	updateTaskData: {
		taskID: string;
		title: string;
		description: string;
		status: Status;
		tags: TagInput[];
	};
}

export interface RUpdateTask {
	updateTask: ITask;
}

export interface IDeleteTask {
	deleteTaskData: {
		taskID: string;
	};
}

export interface RDeleteTask {
	deleteTask: string;
}
