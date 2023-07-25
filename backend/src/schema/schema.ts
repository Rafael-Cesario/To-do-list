import { makeExecutableSchema } from "@graphql-tools/schema";
import gql from "graphql-tag";
import { userTypeDefs } from "./typedefs/user";
import { userResolver } from "./resolvers/user";

const placeholderTypeDef = gql`
	type Query {
		hello: String!
	}
`;

const placeholderResolver = {
	Query: {
		hello: () => "Hello graphQl",
	},
};

export const schema = makeExecutableSchema({
	typeDefs: [placeholderTypeDef, userTypeDefs],
	resolvers: [placeholderResolver, userResolver],
});
