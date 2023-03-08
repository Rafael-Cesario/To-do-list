export const UserTypeDefs = `#graphql
    type User {
        name: String!
        email: String!
        password: String!
    }

    type TypeMessage {
        message: String!
    }

    type LoginResponse {
        message: String!
        token: String!
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

    input InputLogin {
        email: String!
        password: String!
    }


    type Query {
        readUser(email:String!):User!
        login(login:InputLogin!): LoginResponse!
    }

    type Mutation {
        createUser(user:InputUser!): TypeMessage!
        updateUser(updateUser: InputUpdateUser!): TypeMessage!
        deleteUser(email:String!): TypeMessage!
    }
`;
