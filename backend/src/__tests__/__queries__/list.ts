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
}

export const listQueries = new ListQueries();