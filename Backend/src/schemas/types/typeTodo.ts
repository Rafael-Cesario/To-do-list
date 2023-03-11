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

    input InputRenameTodo {
        email: String!
        listName: String!
        id: String!
        newTask: String!
    }

    type Query {
        readTodos(readTodos: InputReadTodos!): [Todo]!
    }

    type Mutation {
        createTodo(createTodo: InputCreateTodo!): TypeMessage!
        renameTodo(renameTodo: InputRenameTodo!): TypeMessage!

        # delete Todo

        # create Tag
        # rename Tag
        # delete Tag
    }
`;
