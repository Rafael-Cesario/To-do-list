import gql from "graphql-tag";

export const tagTypeDefs = gql`
	type Tag {
		userID: String!
		tagID: String!
		name: String!
		color: String!
	}

	input ICreateTag {
		userID: String!
		name: String!
		color: String!
	}

	input IUpdateTag {
		tagID: String!
		name: String!
		color: String!
	}

	type Query {
		getTags(userID: String!): [Tag]!
	}

	type Mutation {
		createTag(input: ICreateTag!): Tag!
		updateTag(input: IUpdateTag!): Tag!
		deleteTag(tagID: String!): String!
	}
`;
