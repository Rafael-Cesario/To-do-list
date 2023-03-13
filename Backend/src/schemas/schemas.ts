import { makeExecutableSchema } from '@graphql-tools/schema';
import { ListsResolvers } from './resolvers/resolverLists';
import { TagsResolver } from './resolvers/resolverTags';
import { TodoResolver } from './resolvers/resolverTodo';
import { UserResolvers } from './resolvers/resolverUser';
import { ListsTypeDefs } from './types/typeLists';
import { TagsTypeDef } from './types/typeTags';
import { TodoTypeDef } from './types/typeTodo';
import { UserTypeDefs } from './types/typeUser';

export const schema = makeExecutableSchema({
	typeDefs: [UserTypeDefs, ListsTypeDefs, TodoTypeDef, TagsTypeDef],
	resolvers: [UserResolvers, ListsResolvers, TodoResolver, TagsResolver],
});
