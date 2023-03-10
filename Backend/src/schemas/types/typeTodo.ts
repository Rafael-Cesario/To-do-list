export const TodoTypeDef = `#graphql
    input InputCreateTodo {
        email: String!
        listName: String!
        id: String!
        task: String!
    }

    type Mutation {
        createTodo(createTodo:InputCreateTodo!): TypeMessage!
    }
`;
