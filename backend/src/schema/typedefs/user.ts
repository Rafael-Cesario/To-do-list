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

	type ResponseLogin {
		token: String!
		userID: String!
	}

    input INewUser {
		id: String
		email: String!
		name: String!
		password: String!
    }

	input IUser {
		email: String!
		password: String!
	}


    type Mutation {
        createUser(newUser: INewUser!): Message!
		login(user: IUser!): ResponseLogin!
    }
`;
