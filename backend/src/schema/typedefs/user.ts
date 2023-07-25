import gql from "graphql-tag";

export const userTypeDefs = gql`
	type User {
		id: String
		email: String
		name: String
		password: String
	}

	type Message {
		message: String!
	}

    input INewUser {
		id: String
		email: String!
		name: String!
		password: String!
    }

    type Mutation {
        createUser(newUser: INewUser!): Message!
    }
`;
