export const TagsTypeDef = `#graphql
    input InputCreateTag {
        email: String!
        listName: String!
        id: String!
        tag: String!
    }

    input InputUpdateTag {
        email: String!
        listName: String!
        id: String!
        oldTag: String!
        newTag: String!
    }

    type Mutation {
        createTag (createTag: InputCreateTag!): TypeMessage!
        updateTag (updateTag: InputUpdateTag!): TypeMessage!
    }
`;
