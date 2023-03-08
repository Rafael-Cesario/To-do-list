import { makeExecutableSchema } from '@graphql-tools/schema';
import { ListsResolvers } from './resolvers/resolverLists';
import { UserResolvers } from './resolvers/resolverUser';
import { ListsTypeDefs } from './types/typeLists';
import { UserTypeDefs } from './types/typeUser';

export const schema = makeExecutableSchema({
	typeDefs: [UserTypeDefs, ListsTypeDefs],
	resolvers: [UserResolvers, ListsResolvers],
});
