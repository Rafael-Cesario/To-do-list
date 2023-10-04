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

	readonly UPDATE_TASK = gql`
		mutation UpdateTask($updateTaskData: UpdateTaskInput!) {
			updateTask(updateTaskData: $updateTaskData) {
				id
				listID
				title
				description
				createdAt
				status
				tags {
					id
					taskID
					name
					color
				}
			}
		}
	`;

	readonly DELETE_TASK = gql`
		mutation DeleteTask($deleteTaskData: DeleteTaskInput!) {
			deleteTask(deleteTaskData: $deleteTaskData)
		}
	`;
}

export const taskQueries = new TaskQueries();
