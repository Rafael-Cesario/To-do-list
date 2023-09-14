import gql from 'graphql-tag';

class TaskQueries {
  readonly CREATE_TASK = gql`
    mutation CreateTask($createTaskData: CreateTaskInput!) {
      createTask(createTaskData: $createTaskData) {
        createdAt
        description
        id
        listID
        status
        tags {
          color
          id
          name
          taskID
        }
        title
      }
    }
  `;

  readonly UPDATE_TASK = gql`
    mutation UpdateTask($updateTaskData: UpdateTaskInput!) {
      updateTask(updateTaskData: $updateTaskData) {
        createdAt
        description
        id
        listID
        status
        tags {
          color
          id
          name
          taskID
        }
        title
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
