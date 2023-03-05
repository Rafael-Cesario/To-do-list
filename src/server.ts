import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { schema } from './schemas/schemas';

const server = new ApolloServer({ schema });

export const startServer = async () => {
	const { url } = await startStandaloneServer(server, {
		listen: { port: 4000 },
	});

	console.log(`Server is open here: ${url}`);
};
