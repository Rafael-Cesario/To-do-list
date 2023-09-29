import { gql } from "@apollo/client";

class TaskQueries {
	readonly CREATE_TASK = gql`
		mutation CreateTask($createTaskData: CreateTaskInput!) {
			createTask(createTaskData: $createTaskData) {
				listID
				id
				title
				description
				status
				createdAt
				tags {
					taskID
					id
					name
					color
				}
			}
		}
	`;
}

export const taskQueries = new TaskQueries();
