import { gql } from "@apollo/client";

class ListQueries {
	readonly GET_LISTS = gql`
		query GetLists($getListData: GetListInput!) {
			getLists(getListData: $getListData) {
				id
				name
				userID
				tasks {
					createdAt
					description
					id
					listID
					status
					title
					tags {
						color
						id
						name
						taskID
					}
				}
			}
		}
	`;

	readonly CREATE_LIST = gql`
		mutation CreateList($createListData: CreateListInput!) {
			createList(createListData: $createListData) {
				id
				name
				userID
			}
		}
	`;

	readonly UPDATE_LIST = gql`
		mutation UpdateList($updateListData: UpdateListInput!) {
			updateList(updateListData: $updateListData) {
				id
				userID
				name
				tasks {
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
		}
	`;
}

export const listQueries = new ListQueries();
