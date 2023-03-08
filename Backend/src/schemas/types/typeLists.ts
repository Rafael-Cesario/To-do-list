export const ListsTypeDefs = `#graphql
    type Lists {
        email: String!
        listName: String!
    }

    type TypeMessage {
        message: String!
    }

    type ResponseReadLists {
        lists: [String]!
    }

    input InputCreateList {
        email: String!
        listName: String!
    }

    type Query {
        readLists(email:String!): ResponseReadLists!
    }

    type Mutation {
        createList(createList: InputCreateList!): TypeMessage!
    }
`;
