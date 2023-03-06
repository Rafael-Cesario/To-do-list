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

    type Query {
        readUser(email:String!):User!
    }

    type Mutation {
        createUser(user:InputUser!): TypeMessage!
    }
`;
