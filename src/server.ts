import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { makeExecutableSchema } from '@graphql-tools/schema';

const helloTypeDefs = `#graphql
    type Query {
        hello: String!
    }
`;

const helloResolvers = {
  Query: {
    hello: () => 'Hello World',
  },
};

const schema = makeExecutableSchema({
  typeDefs: [helloTypeDefs],
  resolvers: [helloResolvers],
});

const server = new ApolloServer({ schema });

export const startServer = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`Server is open here: ${url}`);
};
