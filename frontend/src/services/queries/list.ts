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
}

export const listQueries = new ListQueries();
