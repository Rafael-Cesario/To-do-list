import { makeExecutableSchema } from '@graphql-tools/schema';
import { ListsResolvers } from './resolvers/resolverLists';
import { TodoResolver } from './resolvers/resolverTodo';
import { UserResolvers } from './resolvers/resolverUser';
import { ListsTypeDefs } from './types/typeLists';
import { TodoTypeDef } from './types/typeTodo';
import { UserTypeDefs } from './types/typeUser';

export const schema = makeExecutableSchema({
	typeDefs: [UserTypeDefs, ListsTypeDefs, TodoTypeDef],
	resolvers: [UserResolvers, ListsResolvers, TodoResolver],
});
