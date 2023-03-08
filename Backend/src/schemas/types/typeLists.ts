export const ListsTypeDefs = `#graphql
    type Lists {
        email: String!
        listName: String!
    }

    type TypeMessage {
        message: String!
    }

    input InputCreateList {
        email: String!
        listName: String!
    }

    type Mutation {
        createList(createList: InputCreateList!): TypeMessage!
    }
`;
