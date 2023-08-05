import gql from "graphql-tag";

export const subjectTypeDefs = gql`
	type Subject {
		listID: String!
		subjectID: String!
		name: String!
		date: String!
		amount: Int!
		notes: String!
		tags: [Tag]!
	}

	input ICreateSubject {
		listID: String!
		name: String!
	}

	type Query {
		getSubjects(listID: String!): [Subject]!
	}

	type Mutation {
		createSubject(input: ICreateSubject!): Subject!
	}
`;
