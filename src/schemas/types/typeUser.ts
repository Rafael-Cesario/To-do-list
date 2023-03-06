export const UserTypeDefs = `#graphql
    type User {
        name: String!
        email: String!
        password: String!
    }

    type TypeMessage {
        message: String!
    }


    input InputUser {
        name: String!
        email: String!
        password: String!
    }

    input UpdateUser {
        email: String
        name: String
        password: String
    }

    input InputUpdateUser {
        email: String!
        update: UpdateUser!
    }

    type Query {
        readUser(email:String!):User!
    }

    type Mutation {
        createUser(user:InputUser!): TypeMessage!
        updateUser(updateUser: InputUpdateUser!): TypeMessage!
        deleteUser(email:String!): TypeMessage!
    }
`;
