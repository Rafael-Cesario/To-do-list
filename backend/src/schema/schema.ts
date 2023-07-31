import { makeExecutableSchema } from "@graphql-tools/schema";
import gql from "graphql-tag";
import { userTypeDefs } from "./typedefs/user";
import { userResolver } from "./resolvers/user";
import { listTypeDefs } from "./typedefs/list";
import { listResolver } from "./resolvers/list";

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
	typeDefs: [placeholderTypeDef, userTypeDefs, listTypeDefs],
	resolvers: [placeholderResolver, userResolver, listResolver],
});
