export const TodoTypeDef = `#graphql
    type TypeTodo {
        id: String!
        task: String!
        status: String!
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

    input InputRenameTodo {
        email: String!
        listName: String!
        id: String!
        newTask: String!
    }

    input InputDeleteTodo {
        email: String!
        listName: String!
        id: String!
    }
    
    input InputUpdateStatus {
        email: String!
        listName: String!
        id: String!
        newStatus: String!
    }

    input InputUpdateTodo {
        email: String!
        listName: String!
        id: String!
        task: String!
        status: String!
        tags: [String]!
    }

    type Query {
        readTodos(readTodos: InputReadTodos!): [TypeTodo]!
    }

    type Mutation {
        createTodo(createTodo: InputCreateTodo!): TypeMessage!
        renameTodo(renameTodo: InputRenameTodo!): TypeMessage!
        deleteTodo(deleteTodo: InputDeleteTodo!): TypeMessage!
        updateStatus(updateStatus: InputUpdateStatus!): TypeMessage!
        updateTodo(updateTodo: InputUpdateTodo!): TypeTodo!
    }
`;
