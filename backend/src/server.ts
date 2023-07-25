import { startStandaloneServer } from "@apollo/server/standalone";
import { ApolloServer } from "@apollo/server";
import { makeExecutableSchema } from "@graphql-tools/schema";
import gql from "graphql-tag";

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

const schema = makeExecutableSchema({
	typeDefs: [placeholderTypeDef],
	resolvers: [placeholderResolver],
});

const server = new ApolloServer({ schema });

export const startServer = async (port = 4000) => {
	const { url } = await startStandaloneServer(server, { listen: { port } });
	console.log(`Server is open at:\x1b[32m ${url}`);
};
