import gql from "graphql-tag";

export const subjectTypeDefs = gql`
	type Subject {
		listID: String!
		subjectID: String!
		name: String!
		date: String!
		amount: Int!
		notes: String!
		tags: [String]!
	}

	input ICreateSubject {
		listID: String!
		name: String!
	}

	input IUpdateSubject {
		subjectID: String!
		name: String!
		amount: Int!
		notes: String!
		tags: [String]!
	}

	type Query {
		getSubjects(listID: String!): [Subject]!
	}

	type Mutation {
		createSubject(input: ICreateSubject!): Subject!
		updateSubject(input: IUpdateSubject!): String!
		deleteSubject(subjectID: String!): String!
	}
`;
