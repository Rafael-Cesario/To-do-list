import gql from "graphql-tag";

class ListQueries {
	CREATE_LIST = gql`
		mutation CreateList($input: ICreateList!) {
			createList(input: $input) {
				name
				listID
				userID
			}
		}
	`;

	GET_LISTS = gql`
		query GetLists($userID: String!) {
			getLists(userID: $userID) {
				listID
				userID
				name
				subjectsLength
			}
		}
	`;

	RENAME_LIST = gql`
		mutation RenameList($input: IRenameList!) {
			renameList(input: $input) {
				name
				listID
				userID
			}
		}
	`;

	DELETE_LIST = gql`
		mutation DeleteList($input: IDeleteList!) {
			deleteList(input: $input)
		}
	`;
}

export const listQueries = new ListQueries();
