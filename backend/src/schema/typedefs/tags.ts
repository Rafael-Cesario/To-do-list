import gql from "graphql-tag";

export const tagTypeDefs = gql`
	type Tag {
		subjectID: String!
		tagID: String!
		name: String!
		color: String!
	}
`;
