export const TodoTypeDef = `#graphql
    type Todo {
        id: String!
        task: String!
        state: String!
        tags: [String]!
    }

    input InputCreateTodo {
        email: String!
        listName: String!
        id: String!
        task: String!
    }

    input InputReadTodos {
        email: String!
        listName: String!
    }

    type Query {
        readTodos(readTodos:InputReadTodos!): [Todo]!
    }

    type Mutation {
        createTodo(createTodo:InputCreateTodo!): TypeMessage!
    }
`;
