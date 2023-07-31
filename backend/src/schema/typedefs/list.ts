import gql from "graphql-tag";

export const listTypeDefs = gql`
    type List {
        listID: String
        userID: String
        name: String
    }

    type Query {
        getLists(userID: String!): [List]!
    }
`;