import { startStandaloneServer } from "@apollo/server/standalone";
import { ApolloServer } from "@apollo/server";
import { schema } from "./schema/schema";

const server = new ApolloServer({ schema });

export const startServer = async (port = 4000) => {
	const { url } = await startStandaloneServer(server, { listen: { port } });
	console.log(`Server is open at:\x1b[32m ${url}\x1b[0m`);
};
