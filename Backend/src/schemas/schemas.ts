import { makeExecutableSchema } from '@graphql-tools/schema';
import { UserResolvers } from './resolvers/resolverUser';
import { UserTypeDefs } from './types/typeUser';

// todo > temp
const helloTypeDefs = `#graphql
    type Query {
        hello: String!
    }
`;

// todo > temp
const helloResolvers = {
	Query: {
		hello: () => 'Hello World',
	},
};

export const schema = makeExecutableSchema({
	typeDefs: [helloTypeDefs, UserTypeDefs],
	resolvers: [helloResolvers, UserResolvers],
});
