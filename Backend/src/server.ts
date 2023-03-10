import 'dotenv/config';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { GraphQLFormattedError } from 'graphql';
import { schema } from './schemas/schemas';

const server = new ApolloServer({
	schema,
	formatError: (formattedError: GraphQLFormattedError) => ({ message: formattedError.message }),
});

export const startServer = async (port = 4000) => {
	const { url } = await startStandaloneServer(server, {
		listen: { port },
	});

	const testEnvironment = process.env.NODE_ENV === 'test';
	testEnvironment || console.log(`Server is open here: ${url}`);

	return url;
};
