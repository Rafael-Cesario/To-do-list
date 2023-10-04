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
    
    input InputRenameList {
        email: String!
        oldName: String!
        newName: String!
    }

    input InputDeleteList {
        listName: String!
        email: String!
    }

    type Query {
        readLists(email:String!): ResponseReadLists!
    }

    type Mutation {
        createList(createList: InputCreateList!): TypeMessage!
        renameList(renameList: InputRenameList!): TypeMessage!
        deleteList(deleteList: InputDeleteList!): TypeMessage!
    }
`;
