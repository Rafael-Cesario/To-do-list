import gql from "graphql-tag";

export const listTypeDefs = gql`
	type Query {
		getLists(userID: String!): [List]!
	}

	type Mutation {
		createList(input: ICreateList!): List!
	}

	type List {
		listID: String
		userID: String
		name: String
	}

	input ICreateList {
		userID: String
		name: String
	}
`;
