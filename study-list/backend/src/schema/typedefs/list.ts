import gql from "graphql-tag";

export const listTypeDefs = gql`
	type Query {
		getLists(userID: String!): [List]!
	}

	type Mutation {
		createList(input: ICreateList!): List!
		renameList(input: IRenameList!): List!
		deleteList(input: IDeleteList!): String!
	}

	type List {
		listID: String!
		userID: String!
		name: String!
		subjectsLength: Int!
	}

	input ICreateList {
		userID: String!
		name: String!
	}

	input IRenameList {
		userID: String!
		listID: String!
		newName: String!
	}

	input IDeleteList {
		listID: String!
	}
`;
